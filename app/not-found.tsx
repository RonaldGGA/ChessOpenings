import Link from 'next/link';
import { FaChessKing, FaHome, FaSearch } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen  text-white flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-md mx-auto">
        <div className="relative mb-6">
          <div className="text-6xl font-bold bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            404
          </div>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-3">
            Page Not Found
          </h1>
          <p className="text-gray-300">
            The position you&apos;re looking for doesn&apos;t exist in our opening database.
          </p>
        </div>

        <div className="mb-6 flex justify-center">
          <div className="grid grid-cols-4 gap-1 max-w-xs mx-auto">
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded ${
                  Math.floor(i / 4) % 2 === i % 2
                    ? 'bg-yellow-400/20'
                    : 'bg-slate-700/50'
                }`}
              ></div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 justify-center mb-6">
          <Link
            href="/"
            className="px-5 py-2.5 bg-yellow-500 text-slate-900 font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
          >
            <FaHome className="h-3 w-3" />
            Back to Home
          </Link>
          <Link
            href="/search-openings"
            className="px-5 py-2.5 bg-transparent text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400/10 transition-all duration-300 border border-yellow-400/50 hover:border-yellow-400 flex items-center justify-center gap-2 text-sm"
          >
            <FaSearch className="h-3 w-3" />
            Search Openings
          </Link>
        </div>
      </div>

      <footer className="absolute bottom-0 left-0 right-0 bg-slate-800/30 backdrop-blur-sm border-t border-slate-700/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col items-center text-xs text-gray-400">
            <div className="flex items-center space-x-2 mb-1">
              <FaChessKing className="h-3 w-3 text-yellow-400" />
              <span>© 2025 ChessMaster</span>
            </div>
            <div>Error 404 • Page Not Found</div>
          </div>
        </div>
      </footer>
    </div>
  );
}