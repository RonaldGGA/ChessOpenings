import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server'

function formatMoveHistory(moves: string[]): string {
  if (moves.length === 0) return '';

  let formatted = '';
  let moveNumber = 1;
  
  for (let i = 0; i < moves.length; i += 2) {
    // Agregar número de jugada
    formatted += `${moveNumber}. ${moves[i]}`;
    
    // Agregar movimiento de negras si existe
    if (i + 1 < moves.length) {
      formatted += ` ${moves[i + 1]}`;
    }
    
    // Agregar espacio entre jugadas (excepto después de la última)
    if (i + 2 < moves.length) {
      formatted += ' ';
    }
    
    moveNumber++;
  }
  
  return formatted;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  console.log('Starting /api/openings/match request');
  
  try {
    const { searchParams } = new URL(request.url)
    console.log('Search params:', Object.fromEntries(searchParams));
    
    const moveHistory = searchParams.get('moveHistory')
    if (!moveHistory) {
      console.log('Missing moveHistory parameter');
      return NextResponse.json(
        { error: 'El parámetro moveHistory es requerido' },
        { status: 400 }
      )
    }

    let movesArray: string[];
    try {
      movesArray = JSON.parse(moveHistory);
      if (!Array.isArray(movesArray)) {
        console.error('Invalid moveHistory format: not an array');
        throw new Error('moveHistory debe ser un array');
      }
    } catch (error) {
      console.error('Error parsing moveHistory:', error);
      return NextResponse.json(
        { error: 'Formato inválido para moveHistory. Debe ser un array JSON' },
        { status: 400 }
      )
    }

    if (!Array.isArray(movesArray) || movesArray.length === 0) {
      return NextResponse.json({
        exactMatches: false,
        count: 0,
        openings: [],
        transitions: []
      })
    }

    // Convertir el array al formato de la base de datos
    const normalizedMoves = formatMoveHistory(movesArray)


    // Tipos explícitos para los resultados
    type BaseOpening = {
      id: string;
      fen: string;
      eco: string;
      moves: string;
      name: string;
      src: string;
      isEcoRoot: boolean | null;
      aliases: { source: string; value: string }[];
    };

    type Transition = {
      id: string;
      fromFen: string;
      toFen: string;
      fromSrc: string;
      toSrc: string;
      fromOpening: {
        id: string;
        fen: string;
        eco: string;
        name: string;
        moves: string;
      } | null;
      toOpening: {
        id: string;
        fen: string;
        eco: string;
        name: string;
        moves: string;
      } | null;
    };

    const [baseOpenings, transitions]: [BaseOpening[], Transition[]] = await Promise.all([
      prisma.opening.findMany({
        where: {
          OR: [
            { moves: { startsWith: normalizedMoves, mode: 'insensitive' } },
            { moves: { contains: ` ${normalizedMoves} `, mode: 'insensitive' } },
          ]
        },
        select: {
          id: true,
          fen: true,
          eco: true,
          moves: true,
          name: true,
          src: true,
          isEcoRoot: true,
          aliases: { select: { source: true, value: true } }
        },
        orderBy: [
          { isEcoRoot: 'desc' },
          { eco: 'asc' },
          { moves: 'asc' }
        ],
        take: 15
      }),
      prisma.fromTo.findMany({
        where: {
          OR: [
            { fromSrc: { contains: normalizedMoves, mode: 'insensitive' } },
            { toSrc: { contains: normalizedMoves, mode: 'insensitive' } }
          ]
        },
        select: {
          id: true,
          fromFen: true,
          toFen: true,
          fromSrc: true,
          toSrc: true,
          fromOpening: { select: { id: true, fen: true, eco: true, name: true, moves: true } },
          toOpening: { select: { id: true, fen: true, eco: true, name: true, moves: true } }
        },
        take: 10
      })
    ]);

    const exactMatches: boolean = baseOpenings.some((opening: BaseOpening) =>
      opening.moves.toLowerCase().startsWith(normalizedMoves.toLowerCase())
    );

    const result: {
      exactMatches: boolean;
      count: number;
      openings: BaseOpening[];
      transitions: Transition[];
      searchInfo: {
        normalizedMoves: string;
        movesCount: number;
        moves: string[];
      };
    } = {
      exactMatches,
      count: baseOpenings.length,
      openings: baseOpenings,
      transitions,
      searchInfo: {
        normalizedMoves,
        movesCount: movesArray.length,
        moves: movesArray
      }
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error('Error buscando openings:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}