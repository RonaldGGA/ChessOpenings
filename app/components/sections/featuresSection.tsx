import FeatureCard from "../ui/featureCard"


const FeaturesSection = () => {
  const features = [
    {
      icon: 'graph_icon.svg',
      title: 'Real-Time Analysis',
      description: 'Instant Stockfish evaluation on every move, just like chess.com. See tactical and strategic advantages immediately.',
      stats: 'Like chess.com analysis',
      color: 'blue'
    },
    {
      icon: 'diana_icon.svg',
      title: 'Smart Recommendations',
      description: 'System that suggests openings based on your level, play style, and progress. Learn what works best for you.',
      stats: 'Personalized learning',
      color: 'purple'
    },
    {
      icon: 'stonks_icon.svg',
      title: 'Progress Tracking',
      description: 'Detailed dashboard with clear metrics of your improvement in each opening. Know exactly where to improve.',
      stats: 'Data-driven improvement',
      color: 'green'
    }
  ]

  return (
    <section id="features" className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 mb-6">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            <span className="text-sm font-medium text-blue-700">Why Choose Chess Openings</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Everything you need to
            <span className="block text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              master chess openings
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We combine the power of chess engines with real game data 
            to provide you with the best learning experience.
          </p>
        </div>


        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 lg:mt-24">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 lg:p-12 border border-blue-200">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Ready to improve your game?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of players who are already mastering openings with our system.
            </p>
            <button className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25">
              Start Free
            </button>
            <p className="text-sm text-gray-500 mt-4">
              No credit card required • 14-day free trial
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection