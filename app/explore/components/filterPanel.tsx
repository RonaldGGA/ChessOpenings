// components/explore/FilterPanel.tsx
'use client'

interface Filters {
  search: string
  eco: string
  color: 'all' | 'white' | 'black'
  difficulty: 'all' | 'beginner' | 'intermediate' | 'advanced'
  popularity: 'all' | 'high' | 'medium' | 'low'
}

interface FilterPanelProps {
  filters: Filters
  onFilterChange: (filters: Partial<Filters>) => void
  resultsCount: number
  totalCount: number
  loading: boolean
  onClose?: () => void
}

const ecoOptions = [
  { value: 'all', label: 'Todas las categorías ECO' },
  { value: 'A', label: 'A - Aperturas de flanco' },
  { value: 'B', label: 'B - Aperturas semiabiertas' },
  { value: 'C', label: 'C - Aperturas abiertas' },
  { value: 'D', label: 'D - Gambito de Dama' },
  { value: 'E', label: 'E - Defensas indias' },
]

const colorOptions = [
  { value: 'all', label: 'Ambos colores' },
  { value: 'white', label: 'Blancas' },
  { value: 'black', label: 'Negras' },
]

const difficultyOptions = [
  { value: 'all', label: 'Todas las dificultades' },
  { value: 'beginner', label: 'Principiante' },
  { value: 'intermediate', label: 'Intermedio' },
  { value: 'advanced', label: 'Avanzado' },
]

const popularityOptions = [
  { value: 'all', label: 'Toda popularidad' },
  { value: 'high', label: 'Alta popularidad' },
  { value: 'medium', label: 'Popularidad media' },
  { value: 'low', label: 'Baja popularidad' },
]

export default function FilterPanel({
  filters,
  onFilterChange,
  resultsCount,
  totalCount,
  loading,
  onClose
}: FilterPanelProps) {

  const handleFilterUpdate = (key: keyof Filters, value: string) => {
    onFilterChange({ [key]: value })
  }

  const clearFilters = () => {
    onFilterChange({
      search: '',
      eco: 'all',
      color: 'all',
      difficulty: 'all',
      popularity: 'all'
    })
  }

  const hasActiveFilters = filters.eco !== 'all' || 
                          filters.color !== 'all' || 
                          filters.difficulty !== 'all' || 
                          filters.popularity !== 'all'

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 h-fit lg:sticky lg:top-24">
      {/* Header del Panel */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              disabled={loading}
            >
              Limpiar
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Filtro ECO */}
      <div className="mb-6">
        <label htmlFor="eco" className="block text-sm font-medium text-gray-700 mb-2">
          Categoría ECO
        </label>
        <select
          id="eco"
          value={filters.eco}
          onChange={(e) => handleFilterUpdate('eco', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          disabled={loading}
        >
          {ecoOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Filtro Color */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Color
        </label>
        <div className="space-y-2">
          {colorOptions.map(option => (
            <label key={option.value} className="flex items-center">
              <input
                type="radio"
                name="color"
                value={option.value}
                checked={filters.color === option.value}
                onChange={(e) => handleFilterUpdate('color', e.target.value)}
                className="text-blue-600 focus:ring-blue-500"
                disabled={loading}
              />
              <span className="ml-2 text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Filtro Dificultad */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dificultad
        </label>
        <div className="space-y-2">
          {difficultyOptions.map(option => (
            <label key={option.value} className="flex items-center">
              <input
                type="radio"
                name="difficulty"
                value={option.value}
                checked={filters.difficulty === option.value}
                onChange={(e) => handleFilterUpdate('difficulty', e.target.value)}
                className="text-blue-600 focus:ring-blue-500"
                disabled={loading}
              />
              <span className="ml-2 text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Filtro Popularidad */}
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Popularidad
        </label>
        <div className="space-y-2">
          {popularityOptions.map(option => (
            <label key={option.value} className="flex items-center">
              <input
                type="radio"
                name="popularity"
                value={option.value}
                checked={filters.popularity === option.value}
                onChange={(e) => handleFilterUpdate('popularity', e.target.value)}
                className="text-blue-600 focus:ring-blue-500"
                disabled={loading}
              />
              <span className="ml-2 text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}