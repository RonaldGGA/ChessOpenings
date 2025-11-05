// app/explore/page.tsx (COMPLETAMENTE ACCESIBLE)
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Search,
  Filter,
  Loader,
  ChevronDown,
  Grid,
  List,
  Star,
  TrendingUp,
} from "lucide-react";
import { FaChessKing } from "react-icons/fa";
import ScrollToTop from "../components/scrollToTop";
import OpeningCard from "../components/openingCard";
import { useDebounce } from "../hooks/useDebounce";
import { Navigation } from "../components/navigation";

export interface Opening {
  id: string;
  fen: string;
  name: string;
  eco: string;
  moves: string;
  src: string;
  scid?: string;
  isEcoRoot?: boolean;
  aliases: Array<{
    id: string;
    source: string;
    value: string;
  }>;
  totalVisits?: number;
  totalFavorites?: number;
  isFavorite?: boolean;
  userVisitCount?: number;
}

type SortOption = "name" | "eco" | "popular" | "favorites" | "recent";

const SearchOpeningsPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [openings, setOpenings] = useState<Opening[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedEco, setSelectedEco] = useState("");
  const [ecoOptions, setEcoOptions] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [hasMore, setHasMore] = useState(true);
  const [totalLoaded, setTotalLoaded] = useState(0);

  // Debounce para el search term (300ms de delay)
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Ref para trackear si es el primer render
  const isFirstRender = useRef(true);

  // Fetch openings
  const fetchOpenings = useCallback(
    async (
      page: number = 1,
      append: boolean = false,
      search: string = "",
      eco: string = "",
      sort: SortOption = "popular",
      favoritesOnly: boolean = false
    ) => {
      if (page === 1 && loading) return;
      if (page > 1 && loadingMore) return;

      if (page === 1) {
        setLoading(true);
        if (!append) setOpenings([]);
      } else {
        setLoadingMore(true);
      }

      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: itemsPerPage.toString(),
          search: encodeURIComponent(search),
          eco: encodeURIComponent(eco),
          sort: sort,
          favoritesOnly: favoritesOnly.toString(),
        });

        if (session?.user?.id) {
          params.append("userId", session.user.id);
        }

        const response = await fetch(`/api/openings?${params}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (append) {
          setOpenings((prev) => {
            const allOpenings = [...prev, ...data.openings];
            const uniqueOpenings = Array.from(
              new Map(
                allOpenings.map((opening) => [opening.id, opening])
              ).values()
            );
            return uniqueOpenings;
          });
        } else {
          setOpenings(data.openings || []);

          if (page === 1) {
            const ecoCodes = [...new Set(data.ecoOptions)] as string[];
            setEcoOptions(ecoCodes.sort());
          }
        }

        setHasMore(data.openings.length === itemsPerPage);
        setCurrentPage(page);
        setTotalLoaded((prev) =>
          append ? prev + data.openings.length : data.openings.length
        );
      } catch (error) {
        console.error("Error fetching openings:", error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [itemsPerPage, loading, loadingMore, session]
  );

  // Efecto para búsquedas y filtros
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      fetchOpenings(1, false, "", "", sortBy, showOnlyFavorites);
      return;
    }

    setCurrentPage(1);
    setHasMore(true);
    setTotalLoaded(0);

    fetchOpenings(
      1,
      false,
      debouncedSearchTerm,
      selectedEco,
      sortBy,
      showOnlyFavorites
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, selectedEco, sortBy, showOnlyFavorites]);

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchOpenings(
        currentPage + 1,
        true,
        debouncedSearchTerm,
        selectedEco,
        sortBy,
        showOnlyFavorites
      );
    }
  };

  const handleOpeningClick = (openingId: string) => {
    router.push(`/practice/${openingId}`);
  };

  const handleToggleFavorite = (openingId: string, isFavorite: boolean) => {
    setOpenings((prev) =>
      prev.map((opening) =>
        opening.id === openingId
          ? {
              ...opening,
              isFavorite,
              totalFavorites:
                (opening.totalFavorites || 0) + (isFavorite ? 1 : -1),
            }
          : opening
      )
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedEco("");
    setShowOnlyFavorites(false);
    setSortBy("popular");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEcoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEco(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortOption);
  };

  return (
    <div className="min-h-[120vh] bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <Navigation/>

      {/* Main Content - Landmark principal agregado */}
      <main className="container mx-auto px-4 py-8">
        {/* Header con estructura jerárquica correcta */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FaChessKing className="h-12 w-12 text-yellow-400 mr-3" aria-hidden="true" />
            <h1 className="text-4xl font-bold bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Search Chess Openings
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {totalLoaded > 0
              ? `Found ${openings.length} opening${
                  openings.length !== 1 ? "s" : ""
                }`
              : "Explore thousands of chess openings from our database"}
            {loading && (
              <span aria-live="polite" role="status"> (Searching...)</span>
            )}
          </p>
        </header>

        {/* Search and Filter Section con etiquetas accesibles */}
        <section 
          aria-labelledby="search-filters-heading"
          className="bg-slate-800/50 rounded-2xl p-6 mb-8 border border-slate-700"
        >
          <h2 id="search-filters-heading" className="sr-only">
            Search and Filter Options
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Search Input con label accesible */}
            <div className="md:col-span-2">
              <label htmlFor="search-openings" className="sr-only">
                Search chess openings
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" aria-hidden="true" />
                <input
                  id="search-openings"
                  type="text"
                  placeholder="Search by name, ECO code, moves (e.g., 'Sicilian Defense', 'B20', '1. e4 c5')"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  aria-describedby="search-description"
                />
                {loading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2" aria-hidden="true">
                    <Loader className="h-5 w-5 animate-spin text-yellow-400" />
                  </div>
                )}
              </div>
              <div id="search-description" className="sr-only">
                Search chess openings by name, ECO code, or move sequences
              </div>
            </div>

            {/* ECO Filter con label accesible */}
            <div className="relative">
              <label htmlFor="eco-filter" className="sr-only">
                Filter by ECO code
              </label>
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" aria-hidden="true" />
              <select
                id="eco-filter"
                value={selectedEco}
                onChange={handleEcoChange}
                className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent appearance-none"
                aria-describedby="eco-description"
              >
                <option value="">All ECO Codes</option>
                {ecoOptions.map((eco) => (
                  <option key={eco} value={eco}>
                    {eco}
                  </option>
                ))}
              </select>
              <div id="eco-description" className="sr-only">
                Filter openings by Encyclopedia of Chess Openings code
              </div>
            </div>

            {/* Sort Options con label accesible */}
            <div className="relative">
              <label htmlFor="sort-options" className="sr-only">
                Sort openings by
              </label>
              <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" aria-hidden="true" />
              <select
                id="sort-options"
                value={sortBy}
                onChange={handleSortChange}
                className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent appearance-none"
                aria-describedby="sort-description"
              >
                <option value="popular">Most Popular</option>
                <option value="favorites">Most Favorited</option>
                <option value="recent">Recently Viewed</option>
                <option value="name">Name (A-Z)</option>
                <option value="eco">ECO Code</option>
              </select>
              <div id="sort-description" className="sr-only">
                Choose how to sort the chess openings
              </div>
            </div>
          </div>

          {/* View Controls and Active Filters */}
          <div className="flex items-center justify-between">
            {/* Active Filters */}
            <div className="flex items-center space-x-4">
              {(debouncedSearchTerm || selectedEco) && (
                <div className="text-sm text-gray-300" aria-live="polite">
                  Searching for:
                  {debouncedSearchTerm && ` "${debouncedSearchTerm}"`}
                  {selectedEco && ` in ECO ${selectedEco}`}
                  {loading && "..."}
                </div>
              )}

              {/* Favorites Filter */}
              {session && (
                <button
                  onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                    showOnlyFavorites
                      ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
                      : "bg-slate-700/50 text-gray-400 border-slate-600 hover:border-yellow-500/50 hover:text-yellow-400"
                  }`}
                  aria-pressed={showOnlyFavorites}
                  aria-label={showOnlyFavorites ? "Show all openings" : "Show only favorite openings"}
                >
                  <Star
                    className={`h-4 w-4 ${
                      showOnlyFavorites ? "fill-current" : ""
                    }`}
                    aria-hidden="true"
                  />
                  <span>My Favorites</span>
                </button>
              )}
            </div>

            {/* View Mode Toggle con botones accesibles */}
            <div className="flex items-center space-x-4 ml-auto">
              {/* View Mode Toggle */}
              <div 
                className="flex items-center space-x-1 bg-slate-700/50 rounded-xl p-1 border border-slate-600"
                role="group"
                aria-label="View mode selection"
              >
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                    viewMode === "grid"
                      ? "bg-yellow-500 text-slate-900 shadow-lg shadow-yellow-500/25"
                      : "text-gray-400 hover:text-yellow-400 hover:bg-slate-600/50"
                  }`}
                  aria-pressed={viewMode === "grid"}
                  aria-label="Grid view display"
                >
                  <Grid className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                    viewMode === "list"
                      ? "bg-yellow-500 text-slate-900 shadow-lg shadow-yellow-500/25"
                      : "text-gray-400 hover:text-yellow-400 hover:bg-slate-600/50"
                  }`}
                  aria-pressed={viewMode === "list"}
                  aria-label="List view display"
                >
                  <List className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {/* Clear Filters Button */}
              {(debouncedSearchTerm ||
                selectedEco ||
                showOnlyFavorites ||
                sortBy !== "popular") && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-1 px-3 py-2 bg-slate-700/50 hover:bg-slate-700/70 rounded-xl border border-slate-600 hover:border-yellow-500/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                  aria-label="Clear all search filters"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section aria-labelledby="results-heading">
          <h2 id="results-heading" className="sr-only">
            Search Results
          </h2>
          
          {loading ? (
            <div 
              className="flex justify-center items-center py-16" 
              role="status" 
              aria-live="polite"
              aria-label="Loading openings"
            >
              <div className="text-center">
                <div 
                  className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto mb-4"
                  aria-hidden="true"
                ></div>
                <p className="text-gray-400 text-lg">Loading openings...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Openings Container */}
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
                    : "space-y-4 mb-8"
                }
                role="list"
                aria-label="Chess openings results"
              >
                {openings.map((opening) => (
                  <OpeningCard
                    key={opening.id}
                    opening={opening}
                    viewMode={viewMode}
                    onClick={handleOpeningClick}
                    isFavorite={opening.isFavorite}
                    visitCount={opening.userVisitCount || 0}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && openings.length > 0 && (
                <div className="flex justify-center mb-8">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="px-8 py-4 bg-yellow-500 text-slate-900 font-semibold rounded-xl hover:bg-yellow-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg hover:shadow-xl hover:shadow-yellow-500/25 border-2 border-yellow-500 hover:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                    aria-label={loadingMore ? "Loading more openings" : "Load more openings"}
                  >
                    {loadingMore ? (
                      <>
                        <Loader className="h-5 w-5 animate-spin" aria-hidden="true" />
                        Loading more openings...
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-5 w-5" aria-hidden="true" />
                        Load More Openings
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* No More Results */}
              {!hasMore && openings.length > 0 && (
                <div 
                  className="text-center py-8"
                  role="status"
                  aria-live="polite"
                >
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 max-w-md mx-auto">
                    <div className="text-yellow-400 text-2xl mb-2" aria-hidden="true">🎉</div>
                    <p className="text-gray-400 text-lg mb-2">
                      All {openings.length} openings loaded!
                    </p>
                    <p className="text-gray-500 text-sm">
                      You&apos;ve reached the end of the results
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* No Results State */}
          {!loading && openings.length === 0 && (
            <div 
              className="text-center py-16"
              role="status"
              aria-live="polite"
            >
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-12 border border-slate-700 max-w-2xl mx-auto">
                <FaChessKing className="h-20 w-20 text-gray-600 mx-auto mb-6" aria-hidden="true" />
                <h3 className="text-2xl font-bold text-gray-400 mb-4">
                  {showOnlyFavorites
                    ? "No favorite openings"
                    : "No openings found"}
                </h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto text-lg">
                  {searchTerm || selectedEco
                    ? "Try adjusting your search terms or filters to find what you're looking for."
                    : showOnlyFavorites
                    ? "You haven't added any openings to your favorites yet."
                    : "No openings available in the database."}
                </p>
                {(searchTerm || selectedEco || showOnlyFavorites) && (
                  <button
                    onClick={clearFilters}
                    className="px-8 py-4 bg-yellow-500 text-slate-900 font-semibold rounded-xl hover:bg-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-yellow-500/25 border-2 border-yellow-500 hover:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                    aria-label="Clear search and filters"
                  >
                    Clear Search & Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </section>
      </main>
      <ScrollToTop />
    </div>
  );
};

export default SearchOpeningsPage;