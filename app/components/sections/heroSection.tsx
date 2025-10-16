const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 py-16 lg:py-24 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 mb-6 shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">
                Join 5,000+ chess players improving their game
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 lg:mb-8 leading-tight">
              Master Chess
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Openings Like a Pro
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg lg:text-xl text-gray-600 mb-8 lg:mb-10 max-w-2xl leading-relaxed">
              Learn, practice, and master over <strong>1,000 chess openings</strong> with real-time analysis 
              like chess.com and personalized recommendations based on your skill level.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group relative px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40">
                <span className="relative z-10">Explore Openings</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-white transition-all duration-300 transform hover:scale-105">
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  View Interactive Demo
                </span>
              </button>
            </div>

            {/* Social Proof */}
            <div className="mt-8 lg:mt-12 flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i}
                      className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-2 border-white shadow-sm"
                    />
                  ))}
                </div>
                <span>Join 5,000+ players</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <span>4.9/5 from 287 reviews</span>
              </div>
            </div>
          </div>

          {/* Chess Board Preview */}
          <div className="flex-1 max-w-md lg:max-w-2xl">
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white rounded-2xl shadow-2xl shadow-blue-500/10 border border-gray-200 p-6 lg:p-8 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                {/* Board Container */}
                <div className="aspect-square bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl border-2 border-amber-200 shadow-inner overflow-hidden">
                  {/* Chess Board Grid */}
                  <div className="grid grid-cols-8 grid-rows-8 h-full">
                    {Array.from({ length: 64 }).map((_, index) => {
                      const row = Math.floor(index / 8)
                      const col = index % 8
                      const isLight = (row + col) % 2 === 0
                      
                      return (
                        <div 
                          key={index}
                          className={`flex items-center justify-center ${
                            isLight ? 'bg-amber-100' : 'bg-amber-800'
                          }`}
                        >
                          {/* Sample Pieces for Demo */}
                          {index === 0 && <span className="text-2xl">♜</span>}
                          {index === 4 && <span className="text-2xl">♚</span>}
                          {index === 60 && <span className="text-2xl">♔</span>}
                          {index === 63 && <span className="text-2xl">♖</span>}
                        </div>
                      )
                    })}
                  </div>
                </div>
                
                {/* Evaluation Bar Demo */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">+1.2 advantage</span>
                  </div>
                  <div className="text-sm text-gray-500">Ruy López - C60</div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg border border-gray-200 p-3 transform rotate-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-medium">Best move: Bb5</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-gray-200 p-3 transform -rotate-6">
                <div className="text-xs text-gray-600">
                  <div className="font-medium">85% win rate</div>
                  <div className="text-gray-400">with this opening</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection