import Image from "next/image"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-950 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Top Gradient Line */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

      <div className="relative container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <div className="relative w-6 h-6">
                    <Image 
                      src="/logo.svg" 
                      alt="Chess Openings Logo"
                      width={24}
                      height={24}
                      className="filter brightness-0 invert"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Chess Openings
                  </h3>
                  <p className="text-sm text-gray-400">Master the game</p>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed max-w-md">
                Master chess openings with our intelligent recommendation system, 
                real-time analysis, and progress tracking.
              </p>

              {/* Social Proof */}
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span>4.9/5</span>
                </div>
                <span>•</span>
                <span>5,000+ players</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">Navigation</h3>
            <ul className="space-y-3">
              {['Home', 'Explore Openings', 'Practice Mode', 'My Progress', 'Pricing', 'Dashboard'].map((item) => (
                <li key={item}>
                  <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group text-sm">
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-blue-500 transition-colors"></div>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-3">
              {['Chess Blog', 'Tutorials', 'Support', 'Community', 'Opening Guides', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group text-sm">
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-green-500 transition-colors"></div>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Column */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">Ready to start?</h3>
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <p className="text-sm text-gray-300 mb-4">
                Join the community of players improving their openings.
              </p>
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 mb-3">
                Create Free Account
              </button>
              <p className="text-xs text-gray-500 text-center">
                No commitment • 14-day trial
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span>© {currentYear} Chess Openings.</span>
              <span>All rights reserved.</span>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              {['Privacy Policy', 'Terms of Service', 'Cookies', 'Legal Notice'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="hover:text-white transition-colors text-xs"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer