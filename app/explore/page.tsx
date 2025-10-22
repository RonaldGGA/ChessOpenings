// app/explore/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useChessStore } from '../stores/useChessStore'
import SearchHeader from './components/searchHeader'
import FilterPanel from './components/filterPanel'
import OpeningGrid from './components/openingGrid'


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

interface Filters {
  search: string
  eco: string
  color: 'all' | 'white' | 'black'
  difficulty: 'all' | 'beginner' | 'intermediate' | 'advanced'
  popularity: 'all' | 'high' | 'medium' | 'low'
}

export default function ExplorePage() {
  const [openings, setOpenings] = useState<Opening[]>([])
  const [filteredOpenings, setFilteredOpenings] = useState<Opening[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  
  const [filters, setFilters] = useState<Filters>({
    search: '',
    eco: 'all',
    color: 'all',
    difficulty: 'all',
    popularity: 'all'
  })

  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState<any>(null)

  const { fetchOpenings } = useChessStore()

  // ✅ Cargar aperturas desde la API
  useEffect(() => {
    const loadOpenings = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const apiFilters = {
          search: filters.search || undefined,
          eco: filters.eco !== 'all' ? filters.eco : undefined,
          page: currentPage,
          limit: 12
        }

        const response = await fetchOpenings(apiFilters)

        if (response && response.openings) {
          setOpenings(response.openings)
          setFilteredOpenings(response.openings)
          setPagination(response.pagination)
        } else {
          throw new Error('Formato de respuesta inválido')
        }
      } catch (err) {
        console.error('❌ Error cargando aperturas:', err)
        setError(err instanceof Error ? err.message : 'Error al cargar las aperturas')
        
        // Fallback a datos locales
        try {
          const localOpenings = await import('../data/openings.json')
          setOpenings(localOpenings.default)
          setFilteredOpenings(localOpenings.default)
        } catch (fallbackError) {
          console.error('Fallback también falló:', fallbackError)
        }
      } finally {
        setLoading(false)
      }
    }

    loadOpenings()
  }, [filters.search, filters.eco, currentPage, fetchOpenings])

  // ✅ Filtrado local adicional
  useEffect(() => {
    if (!openings.length) return

    let filtered = [...openings]

    // Filtro por color
    if (filters.color !== 'all') {
      filtered = filtered.filter(opening => {
        const firstMove = opening.moves[0]?.toLowerCase() || ''
        return filters.color === 'white' ? firstMove.includes('e4') || firstMove.includes('d4') 
               : firstMove.includes('e5') || firstMove.includes('c5')
      })
    }

    // Filtro por dificultad
    if (filters.difficulty !== 'all') {
      filtered = filtered.filter(opening => {
        const totalMoves = opening.moves.length
        switch (filters.difficulty) {
          case 'beginner': return totalMoves <= 5
          case 'intermediate': return totalMoves > 5 && totalMoves <= 10
          case 'advanced': return totalMoves > 10
          default: return true
        }
      })
    }

    // Filtro por popularidad
    if (filters.popularity !== 'all') {
      filtered = filtered.filter(opening => {
        switch (filters.popularity) {
          case 'high': return opening.popularity >= 0.7
          case 'medium': return opening.popularity >= 0.4 && opening.popularity < 0.7
          case 'low': return opening.popularity < 0.4
          default: return true
        }
      })
    }

    setFilteredOpenings(filtered)
  }, [openings, filters.color, filters.difficulty, filters.popularity])

  // ✅ Manejar cambios en filtros
  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
    setCurrentPage(1)
  }

  // ✅ Manejar recarga
  const handleRetry = () => {
    setError(null)
    setCurrentPage(1)
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error al cargar</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleRetry}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors w-full"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header de Búsqueda */}
      <SearchHeader
        filters={filters}
        onFilterChange={handleFilterChange}
        resultsCount={filteredOpenings.length}
        totalCount={pagination?.total || 0}
        loading={loading}
        showMobileFilters={showMobileFilters}
        onToggleMobileFilters={() => setShowMobileFilters(!showMobileFilters)}
      />

      {/* Contenido Principal */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Panel de Filtros - Mobile */}
          {showMobileFilters && (
            <div className="lg:hidden">
              <div className="fixed inset-0 bg-black bg-opacity-50 z-40" 
                   onClick={() => setShowMobileFilters(false)} />
              <div className="fixed top-0 left-0 h-full w-80 bg-white z-50 overflow-y-auto p-6 transform transition-transform">
                <FilterPanel
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  resultsCount={filteredOpenings.length}
                  totalCount={pagination?.total || 0}
                  loading={loading}
                  onClose={() => setShowMobileFilters(false)}
                />
              </div>
            </div>
          )}

          {/* Panel de Filtros - Desktop */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              resultsCount={filteredOpenings.length}
              totalCount={pagination?.total || 0}
              loading={loading}
            />
          </div>

          {/* Grid de Aperturas */}
          <div className="flex-1 min-w-0"> {/* min-w-0 para prevenir overflow */}
            <OpeningGrid
              openings={filteredOpenings}
              loading={loading}
              currentPage={currentPage}
              totalPages={pagination?.pages || 1}
              onPageChange={setCurrentPage}
              emptyMessage={
                filters.search || filters.eco !== 'all' || filters.color !== 'all' || 
                filters.difficulty !== 'all' || filters.popularity !== 'all'
                  ? "No se encontraron aperturas con los filtros seleccionados."
                  : "No hay aperturas disponibles en este momento."
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}