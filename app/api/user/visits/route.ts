// app/api/user/visits/route.ts
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

/**Creates an openingVisit node and Increments the number of visits accordingly
*/
export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { openingId } = await request.json();

    if (!openingId) {
      return NextResponse.json({ error: 'Missing openingId' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const existingVisit = await prisma.openingVisit.findUnique({
      where: {
        userId_openingId: {
          userId: user.id,
          openingId: openingId,
        },
      },
    });

    if (existingVisit) {
      await prisma.openingVisit.update({
        where: {
          userId_openingId: {
            userId: user.id,
            openingId: openingId,
          },
        },
        data: {
          count: { increment: 1 },
          visitedAt: new Date(),
        },
      });
    } else {
      await prisma.openingVisit.create({
        data: {
          userId: user.id,
          openingId: openingId,
        },
      });
    }

    await prisma.opening.update({
      where: { id: openingId },
      data: {
        totalVisits: { increment: 1 },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error recording visit:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**Returns the visited openings by the user and the total of openings visited */
export async function GET(request: NextRequest) {
  const session = await auth()

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

    const visits = await prisma.openingVisit.findMany({
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
      orderBy: { visitedAt: 'desc' },
    });

    const total = await prisma.openingVisit.count({
      where: { userId: user.id },
    });

    return NextResponse.json({
      visits,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching visits:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}