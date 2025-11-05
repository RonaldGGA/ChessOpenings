import Link from "next/link";
import { FaChessBoard, FaSearch, FaChartLine } from "react-icons/fa";
import { Navigation } from "./components/navigation";
import { Footer } from "./components/footer";
import HomeToast from "./components/homeToast";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col">
      {/* Navigation - Professional and clean */}
      <Navigation />
      <HomeToast />

      {/* Hero Section */}
      <main className="flex-1 container mx-auto px-4 py-8 md:py-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <div className="mb-8 md:mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-linear-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
                Master Chess Openings
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Professional chess training platform with interactive tools,
              real-time analysis, and comprehensive opening database. Elevate
              your game from beginner to master.
            </p>
          </div>

          {/* Feature Cards - Improved mobile layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12">
            {/* Free Practice Card */}
            <Link
              href="/free-practice"
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 group h-full flex flex-col"
            >
              <div className="flex flex-col items-center text-center flex-1">
                <div className="mb-4 p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20 group-hover:border-yellow-500/40 transition-colors">
                  <FaChessBoard className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-white group-hover:text-yellow-400 transition-colors">
                  Free Practice
                </h3>
                <p className="text-gray-400 text-sm flex-1">
                  Interactive practice board with real-time Stockfish analysis,
                  move suggestions, and opening explorer
                </p>
                <div className="mt-4 text-yellow-400 text-sm font-medium">
                  Start Training →
                </div>
              </div>
            </Link>

            {/* Explore Card */}
            <Link
              href="/search-openings  "
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 group h-full flex flex-col"
            >
              <div className="flex flex-col items-center text-center flex-1">
                <div className="mb-4 p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 group-hover:border-blue-500/40 transition-colors">
                  <FaSearch className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-white group-hover:text-blue-400 transition-colors">
                  Opening Database
                </h3>
                <p className="text-gray-400 text-sm flex-1">
                  Explore 1,000+ chess openings with ECO codes, variations, and
                  professional analysis
                </p>
                <div className="mt-4 text-blue-400 text-sm font-medium">
                  Browse Openings →
                </div>
              </div>
            </Link>

            {/* Dashboard Card */}
            <Link
              href="/dashboard"
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 group h-full flex flex-col"
            >
              <div className="flex flex-col items-center text-center flex-1">
                <div className="mb-4 p-3 bg-green-500/10 rounded-xl border border-green-500/20 group-hover:border-green-500/40 transition-colors">
                  <FaChartLine className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-white group-hover:text-green-400 transition-colors">
                  Progress Tracking
                </h3>
                <p className="text-gray-400 text-sm flex-1">
                  Track your practice sessions, favorite openings, and monitor
                  your improvement over time
                </p>
                <div className="mt-4 text-green-400 text-sm font-medium">
                  View Progress →
                </div>
              </div>
            </Link>
          </div>

          {/* Stats */}
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-700/50 mb-8 md:mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
              <div className="p-4">
                <div className="text-2xl md:text-3xl font-bold text-yellow-400">
                  1,000+
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  Chess Openings
                </div>
              </div>
              <div className="p-4">
                <div className="text-2xl md:text-3xl font-bold text-yellow-400">
                  50+
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  ECO Variations
                </div>
              </div>
              <div className="p-4">
                <div className="text-2xl md:text-3xl font-bold text-yellow-400">
                  Real-time
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  Stockfish Analysis
                </div>
              </div>
              <div className="p-4">
                <div className="text-2xl md:text-3xl font-bold text-yellow-400">
                  Free
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  Forever
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-linear-to-r from-slate-800/50 to-purple-900/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-700">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Ready to Master Chess?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-base md:text-lg">
              Join thousands of players improving their opening repertoire with
              professional tools and analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Link
                href="/free-practice"
                className="px-6 md:px-8 py-3 md:py-4 bg-yellow-500 text-slate-900 font-semibold rounded-xl hover:bg-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-yellow-500/25 border-2 border-yellow-500 hover:border-yellow-400 flex items-center justify-center gap-3 text-sm md:text-base"
              >
                <FaChessBoard className="h-4 w-4 md:h-5 md:w-5" />
                Start Free Practice
              </Link>
              <Link
                href="/search-openings"
                className="px-6 md:px-8 py-3 md:py-4 bg-transparent text-yellow-400 font-semibold rounded-xl hover:bg-yellow-400/10 transition-all duration-300 border-2 border-yellow-400/50 hover:border-yellow-400 flex items-center justify-center gap-3 text-sm md:text-base"
              >
                <FaSearch className="h-4 w-4 md:h-5 md:w-5" />
                Try Searching Openings
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
