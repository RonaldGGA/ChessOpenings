// app/api/openings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

interface Alias {
  id: string;
  value: string;
  source: string;
  openingId: string;
}

interface UserFavorite {
  id: string;
}

interface Visit {
  count: number;
}

interface Opening {
  id: string;
  fen: string;
  name: string;
  eco: string;
  moves: string;
  src: string | null;
  scid: string | null;
  isEcoRoot: boolean | null;
  aliases: Alias[];
  totalVisits: number;
  totalFavorites: number;
  totalPracticeSessions: number;
  UserFavorite?: UserFavorite[];
  visits?: Visit[];
}

interface FormattedOpening {
  id: string;
  fen: string;
  name: string;
  eco: string;
  moves: string;
  src: string | null;
  scid: string | null;
  isEcoRoot: boolean | null;
  aliases: Alias[];
  totalVisits: number;
  totalFavorites: number;
  totalPracticeSessions: number;
  isFavorite: boolean;
  userVisitCount: number;
}

interface WhereClause {
  OR?: Array<{
    name?: { contains: string; mode: 'insensitive' };
    eco?: { contains: string; mode: 'insensitive' };
    moves?: { contains: string; mode: 'insensitive' };
    aliases?: {
      some: {
        value: { contains: string; mode: 'insensitive' };
      };
    };
  }>;
  eco?: string;
  UserFavorite?: {
    some: {
      userId: string;
    };
  };
}

type OrderByClause = Array<{
  [key: string]: 'asc' | 'desc';
}>;

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

interface ApiResponse {
  openings: FormattedOpening[];
  ecoOptions: string[];
  pagination: PaginationInfo;
}

/**Returns the openings that match with the provided params */
export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse | { error: string }>> {
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

    let session = null;
    if (userId) {
      session = await auth();
    }

    const where: WhereClause = {};

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

    let orderBy: OrderByClause = [{ eco: 'asc' }, { name: 'asc' }];
    
    switch (sort) {
      case 'popular':
        orderBy = [{ totalVisits: 'desc' }, { eco: 'asc' }];
        break;
      case 'favorites':
        orderBy = [{ totalFavorites: 'desc' }, { eco: 'asc' }];
        break;
      case 'recent':
        orderBy = [{ eco: 'asc' }, { name: 'asc' }];
        break;
      case 'name':
        orderBy = [{ name: 'asc' }, { eco: 'asc' }];
        break;
      case 'eco':
        orderBy = [{ eco: 'asc' }, { name: 'asc' }];
        break;
    }

    const openings = await prisma.opening.findMany({
      where,
      include: {
        aliases: true,
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

    const formattedOpenings: FormattedOpening[] = openings.map((opening: Opening) => ({
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
      isFavorite: opening.UserFavorite ? opening.UserFavorite.length > 0 : false,
      userVisitCount: opening.visits && opening.visits.length > 0 
        ? opening.visits[0].count 
        : 0
    }));

    const ecoOptionsResult = await prisma.opening.findMany({
      distinct: ['eco'],
      select: {
        eco: true
      },
      orderBy: {
        eco: 'asc'
      }
    });

    const total = await prisma.opening.count({ where });

    const response: ApiResponse = {
      openings: formattedOpenings,
      ecoOptions: ecoOptionsResult.map((item: { eco: string }) => item.eco),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + limit < total
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching openings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}