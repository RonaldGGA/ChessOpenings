// components/explore/OpeningGrid.tsx
'use client'

import OpeningCard from "./openingCard"


interface Opening {
  id: string
  eco: string
  name: string
  moves: string[]
  description?: string
  whiteWins: number
  blackWins: number
  draws: number
  totalGames: number
  popularity: number
  initialFen?: string
  _count?: {
    userFavorites: number
    userProgress: number
  }
}

interface OpeningGridProps {
  openings: Opening[]
  loading: boolean
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  emptyMessage: string
}

export default function OpeningGrid({
  openings,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  emptyMessage
}: OpeningGridProps) {

  const calculateWinRate = (opening: Opening) => {
    if (opening.totalGames === 0) return 0
    return Math.round((opening.whiteWins / opening.totalGames) * 100)
  }

  const getDifficulty = (opening: Opening) => {
    const totalMoves = opening.moves.length
    if (totalMoves <= 5) return 'beginner'
    if (totalMoves <= 10) return 'intermediate'
    return 'advanced'
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border p-6 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="flex space-x-2 mb-4">
              <div className="h-6 bg-gray-200 rounded w-16"></div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  if (openings.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No se encontraron aperturas
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          {emptyMessage}
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Grid de Aperturas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {openings.map((opening) => (
          <OpeningCard
            key={opening.id}
            opening={opening}
            winRate={calculateWinRate(opening)}
            difficulty={getDifficulty(opening)}
            favoriteCount={opening._count?.userFavorites || 0}
            practiceCount={opening._count?.userProgress || 0}
          />
        ))}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-12">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Anterior
          </button>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Página</span>
            <span className="font-semibold text-gray-900">{currentPage}</span>
            <span className="text-sm text-gray-600">de {totalPages}</span>
          </div>
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            Siguiente
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}