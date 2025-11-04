import Link from 'next/link';
import { 
  FaChessBoard, 
  FaSearch, 
  FaChartLine, 
  FaRobot, 
  FaDatabase, 
  FaMobile,
  FaShieldAlt,
  FaSync,
  FaGraduationCap,
} from 'react-icons/fa';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';

const FeaturesPage = () => {
  const mainFeatures = [
    {
      icon: FaChessBoard,
      title: 'Interactive Practice Board',
      description: 'Full-featured chess board with drag & drop, real-time validation, and professional tools',
      highlights: ['Real-time move validation', 'Drag & drop interface', 'Position analysis', 'Practice mode']
    },
    {
      icon: FaRobot,
      title: 'Stockfish Integration',
      description: 'World-class chess engine analysis integrated directly into your training sessions',
      highlights: ['Multiple difficulty levels', 'Real-time suggestions', 'Position evaluation', 'Best move analysis']
    },
    {
      icon: FaDatabase,
      title: 'Comprehensive Opening Database',
      description: 'Access 1,000+ chess openings with detailed variations and professional analysis',
      highlights: ['1,000+ openings', 'ECO classification', 'Variation trees', 'Historical games']
    }
  ];

  const additionalFeatures = [
    {
      icon: FaChartLine,
      title: 'Progress Analytics',
      description: 'Track your improvement with detailed statistics and performance metrics'
    },
    {
      icon: FaSearch,
      title: 'Advanced Search',
      description: 'Find specific openings, variations, or positions with powerful search filters'
    },
    {
      icon: FaMobile,
      title: 'Mobile Responsive',
      description: 'Seamless experience across all devices with optimized mobile interface'
    },
    {
      icon: FaShieldAlt,
      title: 'Secure & Private',
      description: 'Your data remains private and secure with enterprise-grade security'
    },
    {
      icon: FaSync,
      title: 'Real-time Updates',
      description: 'Live updates and synchronization across all your devices'
    },
    {
      icon: FaGraduationCap,
      title: 'Learning Paths',
      description: 'Structured learning paths tailored to your skill level and goals'
    }
  ];

  const technicalSpecs = [
    { category: 'Opening Database', value: '1,000+ openings' },
    { category: 'Analysis Engine', value: 'Stockfish 16' },
    { category: 'Max Depth', value: '25+ moves' },
    { category: 'ECO Coverage', value: 'A00-E99' },
    { category: 'Platform Support', value: 'Web, Mobile, Tablet' },
    { category: 'Update Frequency', value: 'Real-time' }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8 md:py-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-linear-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
              Powerful Features
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Discover the comprehensive suite of professional tools designed to elevate your chess game 
            and accelerate your learning journey.
          </p>
        </div>

        {/* Main Features */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Core Features
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-yellow-500/50 transition-all duration-300 group"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-6 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20 group-hover:border-yellow-500/40 w-fit">
                    <feature.icon className="h-8 w-8 text-yellow-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 mb-6 flex-1">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-400">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Additional Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div 
                key={index}
                className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 group"
              >
                <div className="flex items-start mb-4">
                  <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 mr-4">
                    <feature.icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-300 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Technical Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {technicalSpecs.map((spec, index) => (
              <div key={index} className="text-center p-4">
                <div className="text-2xl font-bold text-yellow-400 mb-2">{spec.value}</div>
                <div className="text-gray-400 text-sm">{spec.category}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-linear-to-r from-slate-800/50 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Ready to Experience These Features?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Start your chess improvement journey today with our comprehensive set of professional tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/free-practice" 
                className="px-8 py-4 bg-yellow-500 text-slate-900 font-semibold rounded-xl hover:bg-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-yellow-500/25 border-2 border-yellow-500 hover:border-yellow-400 flex items-center justify-center gap-3"
              >
                <FaChessBoard className="h-5 w-5" />
                Start Free Practice
              </Link>
              <Link 
                href="/search-openings" 
                className="px-8 py-4 bg-transparent text-yellow-400 font-semibold rounded-xl hover:bg-yellow-400/10 transition-all duration-300 border-2 border-yellow-400/50 hover:border-yellow-400 flex items-center justify-center gap-3"
              >
                <FaSearch className="h-5 w-5" />
                Explore Openings
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default FeaturesPage;