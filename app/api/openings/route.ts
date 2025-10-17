// app/api/openings/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from "../../lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const eco = searchParams.get('eco')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    
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
        orderBy: { popularity: 'desc' },
        include: {
          _count: {
            select: {
              userFavorites: true,
              userProgress: true
            }
          }
        }
      }),
      prisma.opening.count({ where })
    ])

    return NextResponse.json({
      openings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching openings:', error)
    return NextResponse.json({ error: 'Error fetching openings' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const opening = await prisma.opening.create({
      data: body
    })
    return NextResponse.json(opening)
  } catch (error) {
    console.error('Error creating opening:', error)
    return NextResponse.json({ error: 'Error creating opening' }, { status: 500 })
  }
}