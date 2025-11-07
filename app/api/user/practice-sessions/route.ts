//app/api/user/practice-sessions/route
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

/**Creates a new practice-session and increments de opening.totalPracticeSessions count*/
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user?.email) {
      console.log('No session found - Unauthorized');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const { openingId, moves, finalFen, movesCount } = body;

    console.log('Received practice session data:', {
      user: session.user.email,
      movesCount,
      hasOpeningId: !!openingId
    });

    if (!moves || !finalFen || movesCount === undefined) {
      console.error('Missing required fields:', { moves: !!moves, finalFen: !!finalFen, movesCount });
      return NextResponse.json({ 
        error: 'Missing required fields',
        details: { moves: !!moves, finalFen: !!finalFen, movesCount }
      }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      console.error('User not found for email:', session.user.email);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const practiceSession = await prisma.practiceSession.create({
      data: {
        userId: user.id,
        openingId: openingId || null,
        moves: moves.toString(),
        finalFen: finalFen.toString(),
        movesCount: parseInt(movesCount.toString()),
      },
    });

    console.log('Practice session created:', practiceSession.id);

    if (openingId) {
      try {
        await prisma.opening.update({
          where: { id: openingId },
          data: {
            totalPracticeSessions: { increment: 1 },
          },
        });
        console.log('Opening practice count updated:', openingId);
      } catch (openingError) {
        console.error('Error updating opening practice count:', openingError);
      }
    }

    return NextResponse.json({ 
      success: true,
      practiceSession: {
        id: practiceSession.id,
        movesCount: practiceSession.movesCount,
        createdAt: practiceSession.createdAt
      }
    });

  } catch (error) {
    console.error('Error saving practice session:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

/**Returns the practice-sessions of an user with a default limit of 20*/
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const practiceSessions = await prisma.practiceSession.findMany({
      where: { userId: user.id },
      include: {
        opening: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.practiceSession.count({
      where: { userId: user.id },
    });

    return NextResponse.json({
      practiceSessions,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching practice sessions:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}