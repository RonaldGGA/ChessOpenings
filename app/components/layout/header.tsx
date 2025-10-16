import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300">
              <div className="relative w-6 h-6">
                <Image 
                  src="/logo.svg" 
                  alt="Chess Openings Logo"
                  width={24}
                  height={24}
                  className="filter brightness-0 invert"
                  priority
                />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Chess Openings</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Master the game</p>
            </div>
          </Link>

          {/* Navigation Actions */}
          <div className="flex items-center gap-3">
            <Link 
              href="/login" 
              className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors hidden sm:block"
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
            >
              Get Started
            </Link>
            
            {/* Mobile Menu Button */}
            <button className="sm:hidden p-2 text-gray-600 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header