import Link from "next/link";
import { FaChessBoard, FaSearch, FaChartLine } from "react-icons/fa";
import { Footer } from "../components/footer";
import HomeToast from "../components/homeToast";

const HomePage = () => {
  return (
    <div className="min-h-screen  text-white flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8 md:py-16">
        <div className="text-center max-w-4xl mx-auto">
          <header className="mb-8 md:mb-12" role="banner">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span
                className="bg-linear-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent bg-size-200 animate-gradient"
                aria-label="Master Chess Openings - Professional Training Platform"
              >
                Master Chess Openings
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Professional chess training platform with interactive tools,
              real-time analysis, and comprehensive opening database. Elevate
              your game from beginner to master.
            </p>
          </header>

          {/* Feature Cards - Optimized for performance and accessibility */}
          <section aria-labelledby="features-heading" className="mb-12">
            <h2 id="features-heading" className="sr-only">
              Platform Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {/* Free Practice Card */}
              <Link
                href="/free-practice"
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 group h-full flex flex-col focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                aria-label="Free Practice - Interactive chess training with real-time analysis"
                prefetch={false}
              >
                <article className="flex flex-col items-center text-center flex-1">
                  <div
                    className="mb-4 p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20 group-hover:border-yellow-500/40 transition-colors"
                    aria-hidden="true"
                  >
                    <FaChessBoard className="h-8 w-8 text-yellow-400" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-white group-hover:text-yellow-400 transition-colors">
                    Free Practice
                  </h3>
                  <p className="text-gray-400 text-sm flex-1">
                    Interactive practice board with real-time Stockfish
                    analysis, move suggestions, and opening explorer
                  </p>
                  <div className="mt-4 text-yellow-400 text-sm font-medium">
                    Start Training →
                  </div>
                </article>
              </Link>

              {/* Explore Card */}
              <Link
                href="/search-openings"
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 group h-full flex flex-col focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                aria-label="Opening Database - Explore 1000+ chess openings with ECO codes"
                prefetch={false}
              >
                <article className="flex flex-col items-center text-center flex-1">
                  <div
                    className="mb-4 p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 group-hover:border-blue-500/40 transition-colors"
                    aria-hidden="true"
                  >
                    <FaSearch className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-white group-hover:text-blue-400 transition-colors">
                    Opening Database
                  </h3>
                  <p className="text-gray-400 text-sm flex-1">
                    Explore 1,000+ chess openings with ECO codes, variations,
                    and professional analysis
                  </p>
                  <div className="mt-4 text-blue-400 text-sm font-medium">
                    Browse Openings →
                  </div>
                </article>
              </Link>

              {/* Dashboard Card */}
              <Link
                href="/dashboard"
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 group h-full flex flex-col focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                aria-label="Progress Tracking - Monitor your chess improvement over time"
                prefetch={false}
              >
                <article className="flex flex-col items-center text-center flex-1">
                  <div
                    className="mb-4 p-3 bg-green-500/10 rounded-xl border border-green-500/20 group-hover:border-green-500/40 transition-colors"
                    aria-hidden="true"
                  >
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
                </article>
              </Link>
            </div>
          </section>

          <section aria-labelledby="stats-heading" className="mb-8 md:mb-12">
            <h2 id="stats-heading" className="sr-only">
              Platform Statistics
            </h2>
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-700/50">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
                <div className="p-4">
                  <div
                    className="text-2xl md:text-3xl font-bold text-yellow-400"
                    aria-label="1000 plus chess openings"
                  >
                    1,000+
                  </div>
                  <div className="text-gray-400 text-sm md:text-base">
                    Chess Openings
                  </div>
                </div>
                <div className="p-4">
                  <div
                    className="text-2xl md:text-3xl font-bold text-yellow-400"
                    aria-label="50 plus ECO variations"
                  >
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
          </section>

          <section aria-labelledby="cta-heading">
            <div className="bg-linear-to-r from-slate-800/50 to-purple-900/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-700">
              <h2
                id="cta-heading"
                className="text-2xl md:text-3xl font-bold mb-4 text-white"
              >
                Ready to Master Chess?
              </h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-base md:text-lg">
                Join thousands of players improving their opening repertoire
                with professional tools and analysis.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Link
                  href="/free-practice"
                  className="px-6 md:px-8 py-3 md:py-4 bg-yellow-500 text-slate-900 font-semibold rounded-xl hover:bg-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-yellow-500/25 border-2 border-yellow-500 hover:border-yellow-400 flex items-center justify-center gap-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                  aria-label="Start Free Chess Practice"
                  prefetch={false}
                >
                  <FaChessBoard
                    className="h-4 w-4 md:h-5 md:w-5"
                    aria-hidden="true"
                  />
                  Start Free Practice
                </Link>
                <Link
                  href="/search-openings"
                  className="px-6 md:px-8 py-3 md:py-4 bg-transparent text-yellow-400 font-semibold rounded-xl hover:bg-yellow-400/10 transition-all duration-300 border-2 border-yellow-400/50 hover:border-yellow-400 flex items-center justify-center gap-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                  aria-label="Try Searching Chess Openings"
                  prefetch={false}
                >
                  <FaSearch
                    className="h-4 w-4 md:h-5 md:w-5"
                    aria-hidden="true"
                  />
                  Try Searching Openings
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <HomeToast />

      <Footer />
    </div>
  );
};

export default HomePage;
