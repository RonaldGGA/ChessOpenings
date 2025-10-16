import { Opening } from  "../page"
import OpeningCard from "./openingCard"



interface OpeningGridProps {
  openings: Opening[]
  viewMode: 'grid' | 'list'
}

const OpeningGrid: React.FC<OpeningGridProps> = ({ openings, viewMode }) => {
  if (openings.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 text-6xl mb-4">♟️</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No openings found</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Try adjusting your search or filters to find more openings.
        </p>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Clear all filters
        </button>
      </div>
    )
  }

  return (
    <div className={`
      ${viewMode === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6' 
        : 'space-y-4'
      }
    `}>
      {openings.map(opening => (
        <OpeningCard 
          key={opening.id} 
          opening={opening}
          viewMode={viewMode}
        />
      ))}
    </div>
  )
}

export default OpeningGrid