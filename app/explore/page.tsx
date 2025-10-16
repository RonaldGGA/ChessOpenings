"use client"
import { useState, useEffect } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import { mockOpenings } from '../data/mockOpenings'
import SearchBar from './components/searchBar'
import FilterPanel from './components/filterPanel'
import OpeningCardSkeleton from './components/openingCardSkeleton'
import OpeningGrid from './components/openingGrid'
import Pagination from './components/pagination'

export interface Opening {
  id: string
  eco: string
  name: string
  moves: string[]
  description: string
  color: 'white' | 'black'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  popularity: number
  winRate: number
  rating: number
  games: number
}

const ExplorePage: NextPage = () => {
  const [openings, setOpenings] = useState<Opening[]>([])
  const [filteredOpenings, setFilteredOpenings] = useState<Opening[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    color: [] as string[],
    eco: [] as string[],
    difficulty: [] as string[],
    popularity: [] as string[],
  })
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Simular carga de datos
  useEffect(() => {
    const loadOpenings = async () => {
      setLoading(true)
      // En un futuro, esto será una llamada a la API
      setTimeout(() => {
        setOpenings(mockOpenings)
        setFilteredOpenings(mockOpenings)
        setLoading(false)
      }, 1000)
    }

    loadOpenings()
  }, [])

  // Aplicar búsqueda y filtros
  useEffect(() => {
    let results = openings

    // Aplicar búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(opening => 
        opening.name.toLowerCase().includes(query) ||
        opening.eco.toLowerCase().includes(query) ||
        opening.moves.join(' ').toLowerCase().includes(query)
      )
    }

    // Aplicar filtros
    if (filters.color.length > 0) {
      results = results.filter(opening => filters.color.includes(opening.color))
    }
    if (filters.eco.length > 0) {
      results = results.filter(opening => filters.eco.some(eco => opening.eco.startsWith(eco)))
    }
    if (filters.difficulty.length > 0) {
      results = results.filter(opening => filters.difficulty.includes(opening.difficulty))
    }
    if (filters.popularity.length > 0) {
      results = results.filter(opening => {
        const pop = opening.popularity
        return filters.popularity.some(p => {
          if (p === 'very-popular') return pop >= 80
          if (p === 'popular') return pop >= 60 && pop < 80
          if (p === 'average') return pop >= 40 && pop < 60
          if (p === 'uncommon') return pop < 40
          return true
        })
      })
    }

    setFilteredOpenings(results)
    setCurrentPage(1) // Reset a primera página al filtrar
  }, [searchQuery, filters, openings])

  // Paginación
  const totalPages = Math.ceil(filteredOpenings.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentOpenings = filteredOpenings.slice(startIndex, startIndex + itemsPerPage)

  return (
<>

      <Head>
        <title>Explore Openings - Chess Openings</title>
        <meta name="description" content="Browse and search through thousands of chess openings" />
      </Head>

      {/* Header de la página */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Explore Openings
              </h1>
              <p className="text-lg text-gray-600">
                Discover {openings.length} chess openings with detailed analysis and statistics
              </p>
            </div>
            
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              resultsCount={filteredOpenings.length}
            />
          </div>

          {/* Controles de vista y filtros móviles */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Panel de Filtros - Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <FilterPanel 
              filters={filters}
              onFiltersChange={setFilters}
            />
          </aside>

          {/* Contenido Principal */}
          <main className="flex-1 min-h-screen">
            {loading ? (
              // Loading Skeletons
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <OpeningCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <>
                <OpeningGrid 
                  openings={currentOpenings}
                  viewMode={viewMode}
                />
                
                {/* Paginación */}
                {totalPages > 1 && (
                  <div className="mt-12">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage} 
                    />
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
  </>
  )
}

export default ExplorePage