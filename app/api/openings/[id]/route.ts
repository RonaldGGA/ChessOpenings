// app/api/openings/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'

interface Context {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, context: Context) {
  try {
    const { id } = context.params

    const opening = await prisma.opening.findUnique({
      where: { id },
      include: {
        variations: true,
        moveStatistics: {
          orderBy: { total: 'desc' }
        },
        _count: {
          select: {
            userFavorites: true
          }
        }
      }
    })

    if (!opening) {
      return NextResponse.json({ error: 'Opening not found' }, { status: 404 })
    }

    return NextResponse.json(opening)
  } catch (error) {
    console.error('Error fetching opening:', error)
    return NextResponse.json({ error: 'Error fetching opening' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, context: Context) {
  try {
    const { id } = context.params
    const body = await request.json()

    const opening = await prisma.opening.update({
      where: { id },
      data: body
    })

    return NextResponse.json(opening)
  } catch (error) {
    console.error('Error updating opening:', error)
    return NextResponse.json({ error: 'Error updating opening' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  try {
    const { id } = context.params

    await prisma.opening.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Opening deleted successfully' })
  } catch (error) {
    console.error('Error deleting opening:', error)
    return NextResponse.json({ error: 'Error deleting opening' }, { status: 500 })
  }
}