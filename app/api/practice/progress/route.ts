// app/api/practice/progress/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../lib/auth'
import { prisma } from '../../../lib/db'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const openingId = searchParams.get('openingId')

    if (!openingId) {
      return NextResponse.json({ error: 'Opening ID is required' }, { status: 400 })
    }

    const progress = await prisma.userProgress.findUnique({
      where: {
        userId_openingId: {
          userId: session.user.id,
          openingId
        }
      }
    })

    return NextResponse.json(progress || {
      correctMoves: 0,
      totalMoves: 0,
      bestScore: 0,
      timesPracticed: 0
    })
  } catch (error) {
    console.error('Error fetching progress:', error)
    return NextResponse.json({ error: 'Error fetching progress' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { openingId, correctMoves, totalMoves, bestScore } = await request.json()

    const progress = await prisma.userProgress.upsert({
      where: {
        userId_openingId: {
          userId: session.user.id,
          openingId
        }
      },
      update: {
        correctMoves: { increment: correctMoves },
        totalMoves: { increment: totalMoves },
        bestScore: { set: Math.max(bestScore, correctMoves) },
        timesPracticed: { increment: 1 },
        lastPracticed: new Date()
      },
      create: {
        userId: session.user.id,
        openingId,
        correctMoves,
        totalMoves,
        bestScore,
        timesPracticed: 1
      }
    })

    return NextResponse.json(progress)
  } catch (error) {
    console.error('Error updating progress:', error)
    return NextResponse.json({ error: 'Error updating progress' }, { status: 500 })
  }
}