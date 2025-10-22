// components/explore/OpeningCard.tsx
'use client'

import Link from 'next/link'

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
}

interface OpeningCardProps {
  opening: Opening
  winRate: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  favoriteCount: number
  practiceCount: number
}

export default function OpeningCard({
  opening,
  winRate,
  difficulty,
  favoriteCount,
  practiceCount
}: OpeningCardProps) {

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDifficultyText = (diff: string) => {
    switch (diff) {
      case 'beginner': return 'Principiante'
      case 'intermediate': return 'Intermedio'
      case 'advanced': return 'Avanzado'
      default: return diff
    }
  }

  const getPopularityStars = (popularity: number) => {
    const stars = Math.round(popularity * 5)
    return '★'.repeat(stars) + '☆'.repeat(5 - stars)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 overflow-hidden group h-full flex flex-col"> {/* ✅ h-full y flex-col */}
      
      {/* Header - Altura fija */}
      <div className="p-6 border-b border-gray-100 flex-1 flex flex-col"> {/* ✅ flex-1 para ocupar espacio disponible */}
        <div className="flex items-start justify-between mb-3 flex-shrink-0"> {/* ✅ flex-shrink-0 */}
          <div className="flex-1 min-w-0"> {/* ✅ flex-1 y min-w-0 para evitar overflow */}
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded mb-2">
              {opening.eco}
            </span>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate"> {/* ✅ truncate para nombres largos */}
              {opening.name}
            </h3>
          </div>
          <div className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(difficulty)} flex-shrink-0 ml-2`}>
            {getDifficultyText(difficulty)}
          </div>
        </div>

        {/* Movimientos - Altura consistente */}
        <div className="flex flex-wrap gap-1 mb-3 flex-shrink-0"> {/* ✅ flex-shrink-0 */}
          {opening.moves.slice(0, 6).map((move, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-mono flex-shrink-0"
            >
              {move}
            </span>
          ))}
          {opening.moves.length > 6 && (
            <span className="text-gray-400 text-sm flex-shrink-0">+{opening.moves.length - 6}</span>
          )}
        </div>

        {/* Descripción - Ocupa espacio restante */}
        {opening.description && (
          <p className="text-gray-600 text-sm line-clamp-2 flex-1"> {/* ✅ flex-1 para ocupar espacio */}
            {opening.description}
          </p>
        )}
      </div>

      {/* Footer - Altura fija */}
      <div className="p-6 bg-gray-50 flex-shrink-0"> {/* ✅ flex-shrink-0 para altura fija */}
        
        {/* Popularidad */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">Popularidad:</span>
          <div className="flex items-center">
            <span className="text-yellow-500 text-sm mr-2">
              {getPopularityStars(opening.popularity)}
            </span>
            <span className="text-xs text-gray-500">({Math.round(opening.popularity * 100)}%)</span>
          </div>
        </div>

        {/* Estadísticas de Juego */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
          <div>
            <div className="text-sm font-semibold text-green-600">{winRate}%</div>
            <div className="text-xs text-gray-500">Blancas</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-600">
              {Math.round((opening.draws / opening.totalGames) * 100)}%
            </div>
            <div className="text-xs text-gray-500">Tablas</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-red-600">
              {Math.round((opening.blackWins / opening.totalGames) * 100)}%
            </div>
            <div className="text-xs text-gray-500">Negras</div>
          </div>
        </div>

        {/* Botones de Acción - Siempre alineados */}
        <div className="flex space-x-2">
          <Link
            href={`/practice/${opening.id}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2.5 px-4 rounded-lg font-medium transition-colors text-sm"
          >
            Practicar
          </Link>
          <button className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}