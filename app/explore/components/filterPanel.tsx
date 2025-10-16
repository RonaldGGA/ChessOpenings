"use client"

import { useState } from 'react'

interface FilterPanelProps {
  filters: {
    color: string[]
    eco: string[]
    difficulty: string[]
    popularity: string[]
  }
  onFiltersChange: (filters: any) => void
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const filterOptions = {
    color: [
      { value: 'white', label: 'Plays as White', icon: '⚪' },
      { value: 'black', label: 'Plays as Black', icon: '⚫' }
    ],
    eco: [
      { value: 'A', label: 'A: Flank Openings' },
      { value: 'B', label: 'B: Semi-Open Games' },
      { value: 'C', label: 'C: Open Games (1.e4 e5)' },
      { value: 'D', label: 'D: Closed Games (1.d4 d5)' },
      { value: 'E', label: 'E: Indian Defenses' }
    ],
    difficulty: [
      { value: 'beginner', label: '⭐ Beginner' },
      { value: 'intermediate', label: '⭐⭐ Intermediate' },
      { value: 'advanced', label: '⭐⭐⭐ Advanced' }
    ],
    popularity: [
      { value: 'very-popular', label: '⭐⭐⭐⭐⭐ Very Popular' },
      { value: 'popular', label: '⭐⭐⭐⭐ Popular' },
      { value: 'average', label: '⭐⭐⭐ Average' },
      { value: 'uncommon', label: '⭐⭐ Uncommon' }
    ]
  }

  const updateFilter = (filterType: keyof typeof filters, value: string) => {
    const currentFilters = filters[filterType]
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter(item => item !== value)
      : [...currentFilters, value]
    
    onFiltersChange({
      ...filters,
      [filterType]: newFilters
    })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      color: [],
      eco: [],
      difficulty: [],
      popularity: []
    })
  }

  const activeFilterCount = Object.values(filters).reduce((count, current) => count + current.length, 0)

  return (
    <>
      {/* Mobile Filter Trigger */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-4 bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <span className="font-medium text-gray-900">
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </span>
          <svg 
            className={`w-5 h-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Filter Panel */}
      <div className={`
        bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit
        ${isExpanded ? 'block' : 'hidden lg:block'}
      `}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Color Filter */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Color</h4>
          <div className="space-y-2">
            {filterOptions.color.map(option => (
              <label key={option.value} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.color.includes(option.value)}
                  onChange={() => updateFilter('color', option.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                  {option.icon} {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* ECO Category Filter */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">ECO Category</h4>
          <div className="space-y-2">
            {filterOptions.eco.map(option => (
              <label key={option.value} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.eco.includes(option.value)}
                  onChange={() => updateFilter('eco', option.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Difficulty</h4>
          <div className="space-y-2">
            {filterOptions.difficulty.map(option => (
              <label key={option.value} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.difficulty.includes(option.value)}
                  onChange={() => updateFilter('difficulty', option.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Popularity Filter */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Popularity</h4>
          <div className="space-y-2">
            {filterOptions.popularity.map(option => (
              <label key={option.value} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.popularity.includes(option.value)}
                  onChange={() => updateFilter('popularity', option.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default FilterPanel