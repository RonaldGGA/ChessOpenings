// app/api/openings/route.ts
import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const eco = searchParams.get('eco') || '';
    const sort = searchParams.get('sort') || 'popular';
    const favoritesOnly = searchParams.get('favoritesOnly') === 'true';
    const userId = searchParams.get('userId');

    const skip = (page - 1) * limit;

    // Obtener sesión si existe userId
    let session = null;
    if (userId) {
      session = await auth()
    }

    // Construir where clause basado en búsqueda y filtros
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { eco: { contains: search, mode: 'insensitive' } },
        { moves: { contains: search, mode: 'insensitive' } },
        {
          aliases: {
            some: {
              value: { contains: search, mode: 'insensitive' }
            }
          }
        }
      ];
    }

    if (eco) {
      where.eco = eco;
    }

    // Filtrar por favoritos si está habilitado y hay usuario
    if (favoritesOnly && userId && session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true }
      });

      if (user) {
        where.UserFavorite = {
          some: {
            userId: user.id
          }
        };
      }
    }

    // Determinar ordenamiento
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let orderBy: any[] = [{ eco: 'asc' }, { name: 'asc' }];
    
    switch (sort) {
      case 'popular':
        orderBy = [{ totalVisits: 'desc' }, { eco: 'asc' }];
        break;
      case 'favorites':
        orderBy = [{ totalFavorites: 'desc' }, { eco: 'asc' }];
        break;
      case 'recent':
        // Para "recent" necesitamos un enfoque diferente ya que no tenemos un campo de fecha
        orderBy = [{ eco: 'asc' }, { name: 'asc' }];
        break;
      case 'name':
        orderBy = [{ name: 'asc' }, { eco: 'asc' }];
        break;
      case 'eco':
        orderBy = [{ eco: 'asc' }, { name: 'asc' }];
        break;
    }

    // Obtener openings con paginación
    const openings = await prisma.opening.findMany({
      where,
      include: {
        aliases: true,
        // Incluir información de favoritos si hay usuario
        ...(userId && session?.user?.email && {
          UserFavorite: {
            where: {
              user: {
                email: session.user.email
              }
            },
            select: {
              id: true
            }
          }
        }),
        // Incluir información de visitas si hay usuario
        ...(userId && session?.user?.email && {
          visits: {
            where: {
              user: {
                email: session.user.email
              }
            },
            select: {
              count: true
            }
          }
        })
      },
      orderBy,
      skip,
      take: limit,
    });

    // Formatear la respuesta para incluir información de usuario
    const formattedOpenings = openings.map(opening => ({
      id: opening.id,
      fen: opening.fen,
      name: opening.name,
      eco: opening.eco,
      moves: opening.moves,
      src: opening.src,
      scid: opening.scid,
      isEcoRoot: opening.isEcoRoot,
      aliases: opening.aliases,
      totalVisits: opening.totalVisits,
      totalFavorites: opening.totalFavorites,
      totalPracticeSessions: opening.totalPracticeSessions,
      // Información específica del usuario
      isFavorite: opening.UserFavorite && opening.UserFavorite.length > 0,
      userVisitCount: opening.visits && opening.visits.length > 0 
        ? opening.visits[0].count 
        : 0
    }));

    // Obtener opciones de ECO únicas para el filtro
    const ecoOptions = await prisma.opening.findMany({
      distinct: ['eco'],
      select: {
        eco: true
      },
      orderBy: {
        eco: 'asc'
      }
    });

    // Obtener total para paginación
    const total = await prisma.opening.count({ where });

    return NextResponse.json({ 
      openings: formattedOpenings,
      ecoOptions: ecoOptions.map((item: { eco: string }) => item.eco),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + limit < total
      }
    });
  } catch (error) {
    console.error('Error fetching openings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}