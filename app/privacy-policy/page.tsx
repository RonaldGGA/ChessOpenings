// app/privacy-policy/page.tsx

import Link from "next/link";
import {
  FaShieldAlt,
  FaDatabase,
  FaUserCheck,
  FaEnvelope,
} from "react-icons/fa";
import { Footer } from "../../components/footer";

const PrivacyPolicyPage = () => {
  const lastUpdated = "January 1, 2025";

  const dataTypes = [
    {
      title: "Personal Information",
      items: ["Email address", "Username", "Country (optional)"],
    },
    {
      title: "Usage Data",
      items: [
        "Game history",
        "Opening preferences",
        "Practice sessions",
        "Browser type",
        "IP address",
      ],
    },
    {
      title: "Technical Data",
      items: ["Cookies", "Analytics data", "Device information"],
    },
  ];

  const dataUsage = [
    {
      icon: FaUserCheck,
      title: "Service Provision",
      description: "To provide and maintain our chess training services",
    },
    {
      icon: FaDatabase,
      title: "Improvements",
      description:
        "To analyze and improve our platform's performance and features",
    },
    {
      icon: FaEnvelope,
      title: "Communication",
      description: "To send important updates and service notifications",
    },
  ];

  const userRights = [
    "Access your personal data",
    "Correct inaccurate data",
    "Request data deletion",
    "Export your data",
    "Object to data processing",
    "Withdraw consent",
  ];

  return (
    <div className="min-h-screen  text-white flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-linear-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
                Privacy Policy
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
                We are committed to protecting your privacy and being
                transparent about our data practices.
              </p>
            </div>
          </div>

          {/* Data Collection Overview */}
          <section className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 mb-8">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 mr-4">
                <FaShieldAlt className="h-6 w-6 text-blue-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Information We Collect
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dataTypes.map((type, index) => (
                <div
                  key={index}
                  className="bg-slate-700/30 rounded-xl p-6 border border-slate-600"
                >
                  <h3 className="font-bold text-white mb-4">{type.title}</h3>
                  <ul className="space-y-2">
                    {type.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-gray-300"
                      >
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* How We Use Data */}
          <section className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              How We Use Your Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {dataUsage.map((usage, index) => (
                <div key={index} className="text-center">
                  <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20 inline-flex mb-4">
                    <usage.icon className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{usage.title}</h3>
                  <p className="text-gray-300 text-sm">{usage.description}</p>
                </div>
              ))}
            </div>

            <p className="text-gray-300 leading-relaxed">
              We do not sell your personal data to third parties. We only share
              data with trusted service providers who assist us in operating our
              platform, and only to the extent necessary to provide our
              services.
            </p>
          </section>

          {/* Data Protection */}
          <section className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Data Protection & Security
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Security Measures
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    SSL encryption for all data transfers
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    Regular security audits and updates
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    Limited access to personal data
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Data Retention
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    Account data: Until account deletion
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    Analytics: 26 months maximum
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    Cookies: As specified in Cookie Policy
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* User Rights */}
          <section className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Your Data Protection Rights
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {userRights.map((right, index) => (
                <div
                  key={index}
                  className="bg-slate-700/30 rounded-lg p-4 border border-slate-600"
                >
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    <span className="text-gray-300 text-sm">{right}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-gray-300">
              To exercise any of these rights, please contact us through our
              contact form. We will respond to your request within 30 days.
            </p>
          </section>

          {/* Contact */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Privacy Questions?
            </h2>
            <p className="text-gray-300 mb-6">
              If you have any questions about our privacy practices or your
              personal data, we&apos;re here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-6 py-3 bg-yellow-500 text-slate-900 font-semibold rounded-xl hover:bg-yellow-400 transition-all duration-300 border-2 border-yellow-500 hover:border-yellow-400"
              >
                Contact Us
              </Link>
              <Link
                href="/cookie-policy"
                className="px-6 py-3 bg-transparent text-yellow-400 font-semibold rounded-xl hover:bg-yellow-400/10 transition-all duration-300 border-2 border-yellow-400/50 hover:border-yellow-400"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
