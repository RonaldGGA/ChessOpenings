import Link from 'next/link'
import { Opening } from '../page'


interface OpeningCardProps {
  opening: Opening
  viewMode: 'grid' | 'list'
}

const OpeningCard: React.FC<OpeningCardProps> = ({ opening, viewMode }) => {
  if (viewMode === 'list') {
    return (
      <Link href={`/practice/${opening.id}`}>
        <div className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 cursor-pointer p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${
                opening.color === 'white' 
                  ? 'from-gray-100 to-gray-200 border border-gray-300' 
                  : 'from-gray-800 to-gray-900'
              } rounded-lg flex items-center justify-center`}>
                <span className={`text-lg font-bold ${
                  opening.color === 'white' ? 'text-gray-800' : 'text-white'
                }`}>
                  {opening.color === 'white' ? '⚪' : '⚫'}
                </span>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                  {opening.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                    {opening.eco}
                  </span>
                  <span className="text-sm text-gray-500">
                    {opening.moves.slice(0, 4).join(' ')}...
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* Stats */}
              <div className="text-right">
                <div className="text-sm text-gray-600">Win Rate</div>
                <div className="font-semibold text-gray-900">{opening.winRate}%</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Popularity</div>
                <div className="font-semibold text-gray-900">{opening.popularity}%</div>
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span className="text-sm font-medium text-gray-700">{opening.rating}</span>
              </div>

              {/* Practice Button */}
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Practice
              </button>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // Grid View (default)
  return (
    <Link href={`/practice/${opening.id}`}>
      <div className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-blue-200 transition-all duration-300 cursor-pointer h-full flex flex-col">
        {/* Card Header */}
        <div className="p-6 pb-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                {opening.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                  {opening.eco}
                </span>
                <span className={`w-3 h-3 rounded-full ${
                  opening.color === 'white' ? 'bg-gray-300 border border-gray-400' : 'bg-gray-800'
                }`} />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span className="text-sm font-medium text-gray-700">{opening.rating}</span>
            </div>
          </div>

          {/* Moves Preview */}
          <div className="font-mono text-sm text-gray-600 bg-gray-50 rounded px-3 py-2 mb-4">
            {opening.moves.slice(0, 5).join(' ')}
            {opening.moves.length > 5 && '...'}
          </div>
        </div>

        {/* Stats */}
        <div className="px-6 pb-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Win Rate:</span>
            <span className="font-medium text-gray-900">{opening.winRate}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Popularity:</span>
            <span className="font-medium text-gray-900">{opening.popularity}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Difficulty:</span>
            <span className="font-medium text-gray-900 capitalize">{opening.difficulty}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-6 pt-4 mt-auto">
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center">
            Practice Opening
          </button>
        </div>
      </div>
    </Link>
  )
}

export default OpeningCard