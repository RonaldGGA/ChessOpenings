// lib/actions.ts
'use server'

import { prisma } from './db'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth'

export async function getOpening(id: string) {
  try {
    const opening = await prisma.opening.findUnique({
      where: { id },
      include: {
        variations: true,
        moveStatistics: {
          orderBy: { total: 'desc' }
        }
      }
    })
    return opening
  } catch (error) {
    console.error('Error fetching opening:', error)
    return null
  }
}

export async function getOpenings(filters?: {
  search?: string
  eco?: string
  page?: number
  limit?: number
}) {
  try {
    const { search, eco, page = 1, limit = 20 } = filters || {}
    
    const skip = (page - 1) * limit
    
    const where = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { eco: { contains: search, mode: 'insensitive' } }
        ]
      }),
      ...(eco && { eco: { contains: eco } })
    }

    const [openings, total] = await Promise.all([
      prisma.opening.findMany({
        where,
        skip,
        take: limit,
        orderBy: { popularity: 'desc' }
      }),
      prisma.opening.count({ where })
    ])

    return { openings, total }
  } catch (error) {
    console.error('Error fetching openings:', error)
    return { openings: [], total: 0 }
  }
}

export async function updatePracticeProgress(
  openingId: string, 
  stats: { correctMoves: number; totalMoves: number; bestScore: number }
) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    throw new Error('Unauthorized')
  }

  try {
    const progress = await prisma.userProgress.upsert({
      where: {
        userId_openingId: {
          userId: session.user.id,
          openingId
        }
      },
      update: {
        correctMoves: { increment: stats.correctMoves },
        totalMoves: { increment: stats.totalMoves },
        bestScore: { set: Math.max(stats.bestScore, stats.correctMoves) },
        timesPracticed: { increment: 1 },
        lastPracticed: new Date()
      },
      create: {
        userId: session.user.id,
        openingId,
        correctMoves: stats.correctMoves,
        totalMoves: stats.totalMoves,
        bestScore: stats.bestScore,
        timesPracticed: 1
      }
    })

    return progress
  } catch (error) {
    console.error('Error updating progress:', error)
    throw error
  }
}