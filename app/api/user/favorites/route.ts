// app/api/user/favorites/route.ts
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { openingId, action } = await request.json();

    if (!openingId || !action) {
      return NextResponse.json({ error: 'Missing openingId or action' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (action === 'add') {
      // Verificar si ya existe
      const existingFavorite = await prisma.userFavorite.findUnique({
        where: {
          userId_openingId: {
            userId: user.id,
            openingId: openingId,
          },
        },
      });

      if (existingFavorite) {
        return NextResponse.json({ message: 'Already in favorites' });
      }

      // Agregar a favoritos
      const favorite = await prisma.userFavorite.create({
        data: {
          userId: user.id,
          openingId: openingId,
        },
      });

      // Incrementar el contador de favoritos en Opening
      await prisma.opening.update({
        where: { id: openingId },
        data: {
          totalFavorites: { increment: 1 },
        },
      });

      return NextResponse.json({ favorite, action: 'added' });
    } else if (action === 'remove') {
      // Eliminar de favoritos
      await prisma.userFavorite.deleteMany({
        where: {
          userId: user.id,
          openingId: openingId,
        },
      });

      // Decrementar el contador de favoritos en Opening
      await prisma.opening.update({
        where: { id: openingId },
        data: {
          totalFavorites: { decrement: 1 },
        },
      });

      return NextResponse.json({ action: 'removed' });
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error updating favorite:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const favorites = await prisma.userFavorite.findMany({
      where: { userId: user.id },
      include: {
        opening: {
          include: {
            aliases: true,
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.userFavorite.count({
      where: { userId: user.id },
    });

    return NextResponse.json({
      favorites: favorites.map(fav => fav.opening),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}