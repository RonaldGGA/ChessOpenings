// components/explore/SearchHeader.tsx
'use client'

import { useState, useEffect } from 'react'

interface Filters {
  search: string
  eco: string
  color: 'all' | 'white' | 'black'
  difficulty: 'all' | 'beginner' | 'intermediate' | 'advanced'
  popularity: 'all' | 'high' | 'medium' | 'low'
}

interface SearchHeaderProps {
  filters: Filters
  onFilterChange: (filters: Partial<Filters>) => void
  resultsCount: number
  totalCount: number
  loading: boolean
  showMobileFilters: boolean
  onToggleMobileFilters: () => void
}

export default function SearchHeader({
  filters,
  onFilterChange,
  resultsCount,
  totalCount,
  loading,
  showMobileFilters,
  onToggleMobileFilters
}: SearchHeaderProps) {
  const [localSearch, setLocalSearch] = useState(filters.search)

  // Debounce para búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== filters.search) {
        onFilterChange({ search: localSearch })
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [localSearch, filters.search, onFilterChange])

  return (
    <div className="bg-white border-b sticky top-0 z-30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          
          {/* Título y Contador */}
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Explorar Aperturas</h1>
              <div className="text-sm text-gray-600 mt-1">
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                    <span>Cargando...</span>
                  </div>
                ) : (
                  <span>
                    <span className="font-semibold">{resultsCount}</span> de{' '}
                    <span className="font-semibold">{totalCount}</span> aperturas
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Búsqueda y Filtros */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            
            {/* Barra de Búsqueda */}
            <div className="relative flex-1 sm:flex-initial sm:w-80">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar aperturas (Ruy López, Siciliana...)"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  disabled={loading && !localSearch}
                />
                <div className="absolute left-3 top-3.5">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {loading && (
                  <div className="absolute right-3 top-3">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Botón Filtros Móvil */}
            <button
              onClick={onToggleMobileFilters}
              className={`sm:hidden flex items-center justify-center space-x-2 px-4 py-3 border rounded-lg font-medium transition-colors ${
                showMobileFilters
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
              </svg>
              <span>Filtros</span>
            </button>

          </div>
        </div>

        {/* Filtros Rápidos - Solo Desktop */}
        <div className="hidden sm:flex flex-wrap gap-2 mt-4">
          <select
            value={filters.eco}
            onChange={(e) => onFilterChange({ eco: e.target.value })}
            className="text-sm px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
          >
            <option value="all">Todas ECO</option>
            <option value="A">A - Flanco</option>
            <option value="B">B - Semiabiertas</option>
            <option value="C">C - Abiertas</option>
            <option value="D">D - Gambito Dama</option>
            <option value="E">E - Indias</option>
          </select>

          <select
            value={filters.difficulty}
            onChange={(e) => onFilterChange({ difficulty: e.target.value as any })}
            className="text-sm px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
          >
            <option value="all">Todas dificultades</option>
            <option value="beginner">Principiante</option>
            <option value="intermediate">Intermedio</option>
            <option value="advanced">Avanzado</option>
          </select>

          <button
            onClick={() => onFilterChange({ 
              search: '', 
              eco: 'all', 
              color: 'all', 
              difficulty: 'all', 
              popularity: 'all' 
            })}
            className="text-sm px-3 py-1.5 text-blue-600 hover:text-blue-700 font-medium"
            disabled={loading}
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  )
}