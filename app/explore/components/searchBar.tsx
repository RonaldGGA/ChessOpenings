"use client"

import { useState } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  resultsCount: number
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, resultsCount }) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="relative flex-1 max-w-2xl">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search by name, ECO, or moves (e.g. 'e4 e5')..."
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        />
        
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Contador de resultados */}
      {isFocused || value ? (
        <div className="absolute top-full left-0 right-0 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-10">
          Showing {resultsCount} openings for &quot;{value}&quot;
        </div>
      ) : (
        <div className="absolute top-full left-0 right-0 mt-2 text-sm text-gray-600">
          Search {resultsCount} openings...
        </div>
      )}
    </div>
  )
}

export default SearchBar