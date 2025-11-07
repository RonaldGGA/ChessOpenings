//app/cookies-policy/page.tsx
import Link from "next/link";
import { FaCookie, FaCookieBite, FaUserShield, FaCog } from "react-icons/fa";
import { Navigation } from "../../components/navigation";
import { Footer } from "../../components/footer";

const CookiePolicyPage = () => {
  const lastUpdated = "January 1, 2025";

  const cookieTypes = [
    {
      icon: FaCookie,
      type: "Essential Cookies",
      purpose: "Required for basic site functionality",
      examples: ["Session management", "Security", "Load balancing"],
      necessary: true,
    },
    {
      icon: FaCog,
      type: "Functional Cookies",
      purpose: "Remember your preferences and settings",
      examples: ["Language settings", "Theme preferences", "Board settings"],
      necessary: false,
    },
    {
      icon: FaUserShield,
      type: "Analytics Cookies",
      purpose: "Help us improve our service",
      examples: ["Page visits", "Feature usage", "Performance data"],
      necessary: false,
    },
  ];

  const cookieDetails = [
    {
      name: "session_id",
      purpose: "Maintain your login session",
      duration: "Session",
      type: "Essential",
    },
    {
      name: "user_preferences",
      purpose: "Store your board and theme settings",
      duration: "1 year",
      type: "Functional",
    },
    {
      name: "_ga",
      purpose: "Google Analytics tracking",
      duration: "2 years",
      type: "Analytics",
    },
    {
      name: "cookie_consent",
      purpose: "Remember your cookie preferences",
      duration: "1 year",
      type: "Essential",
    },
  ];

  return (
    <div className="min-h-screen  text-white flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-linear-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
                Cookie Policy
              </span>
            </h1>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
              <p className="text-gray-300 mb-4">
                Last updated:{" "}
                <span className="text-yellow-400 font-semibold">
                  {lastUpdated}
                </span>
              </p>
              <p className="text-lg text-gray-300">
                This policy explains how ChessMaster uses cookies and similar
                technologies.
              </p>
            </div>
          </div>

          {/* What are Cookies */}
          <section className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 mb-8">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20 mr-4">
                <FaCookieBite className="h-6 w-6 text-yellow-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                What Are Cookies?
              </h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Cookies are small text files that are stored on your device when
              you visit our website. They help us provide you with a better
              experience by remembering your preferences and understanding how
              you use our service.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We use both session cookies (which expire when you close your
              browser) and persistent cookies (which stay on your device for a
              set period of time).
            </p>
          </section>

          {/* Cookie Types */}
          <section className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Types of Cookies We Use
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cookieTypes.map((cookie, index) => (
                <div
                  key={index}
                  className={`rounded-2xl p-6 border ${
                    cookie.necessary
                      ? "bg-green-900/20 border-green-700/50"
                      : "bg-slate-700/30 border-slate-600"
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <div
                      className={`p-3 rounded-xl border mr-4 ${
                        cookie.necessary
                          ? "bg-green-500/10 border-green-500/20"
                          : "bg-blue-500/10 border-blue-500/20"
                      }`}
                    >
                      <cookie.icon
                        className={`h-6 w-6 ${
                          cookie.necessary ? "text-green-400" : "text-blue-400"
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{cookie.type}</h3>
                      {cookie.necessary && (
                        <span className="text-green-400 text-sm">Required</span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">{cookie.purpose}</p>
                  <div className="space-y-2">
                    {cookie.examples.map((example, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-xs text-gray-400"
                      >
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                        {example}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Cookie Details Table */}
          <section className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Detailed Cookie Information
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="text-left py-4 px-4 text-white font-semibold">
                      Cookie Name
                    </th>
                    <th className="text-left py-4 px-4 text-white font-semibold">
                      Purpose
                    </th>
                    <th className="text-left py-4 px-4 text-white font-semibold">
                      Duration
                    </th>
                    <th className="text-left py-4 px-4 text-white font-semibold">
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cookieDetails.map((cookie, index) => (
                    <tr key={index} className="border-b border-slate-700/50">
                      <td className="py-4 px-4 text-gray-300 font-mono">
                        {cookie.name}
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        {cookie.purpose}
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        {cookie.duration}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            cookie.type === "Essential"
                              ? "bg-green-500/20 text-green-400"
                              : cookie.type === "Functional"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-purple-500/20 text-purple-400"
                          }`}
                        >
                          {cookie.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Cookie Management */}
          <section className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Managing Your Cookie Preferences
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Browser Settings
                </h3>
                <p className="text-gray-300 mb-4">
                  You can control cookies through your browser settings. Most
                  browsers allow you to:
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    See what cookies are stored
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    Block cookies from specific sites
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    Delete all cookies when you close your browser
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Our Cookie Consent
                </h3>
                <p className="text-gray-300 mb-4">
                  When you first visit our site, you can choose which types of
                  non-essential cookies to accept.
                </p>
                <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600">
                  <p className="text-gray-300 text-sm">
                    You can update your preferences at any time by clicking the
                    &quot;Cookie Settings&quot; link in our footer.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Essential Notice */}
          <div className="bg-yellow-900/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-700/50 mb-8">
            <div className="flex items-start">
              <div className="p-2 bg-yellow-500/20 rounded-lg mr-4">
                <FaCookieBite className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">Important Notice</h3>
                <p className="text-yellow-100 text-sm">
                  Essential cookies cannot be disabled as they are necessary for
                  the basic functionality of our website. Disabling them may
                  prevent you from using certain features.
                </p>
              </div>
            </div>
          </div>

          {/* Contact & Links */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Need More Information?
            </h2>
            <p className="text-gray-300 mb-6">
              If you have questions about our use of cookies, we&apos;re happy
              to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-6 py-3 bg-yellow-500 text-slate-900 font-semibold rounded-xl hover:bg-yellow-400 transition-all duration-300 border-2 border-yellow-500 hover:border-yellow-400"
              >
                Contact Us
              </Link>
              <Link
                href="/privacy-policy"
                className="px-6 py-3 bg-transparent text-yellow-400 font-semibold rounded-xl hover:bg-yellow-400/10 transition-all duration-300 border-2 border-yellow-400/50 hover:border-yellow-400"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="px-6 py-3 bg-transparent text-yellow-400 font-semibold rounded-xl hover:bg-yellow-400/10 transition-all duration-300 border-2 border-yellow-400/50 hover:border-yellow-400"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicyPage;
