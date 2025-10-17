// app/practice/[id]/PracticeClient.tsx
'use client'


import { useEffect } from 'react'
import { useChessStore } from '../../stores/useChessStore'
import ChessBoard from '../componentes/chess/chessBoard'


interface PracticeClientProps {
  opening: any
}

export default function PracticeClient({ opening }: PracticeClientProps) {
  const { initializePractice } = useChessStore()

  useEffect(() => {
    initializePractice(opening)
  }, [opening, initializePractice])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Tu JSX existente para la página de práctica */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel izquierdo */}
          <div className="lg:col-span-1 space-y-6">
            {/* Estadísticas y MoveList */}
          </div>
          
          {/* Panel del tablero */}
          <div className="lg:col-span-2">
            <ChessBoard />
          </div>
        </div>
      </div>
    </div>
  )
}