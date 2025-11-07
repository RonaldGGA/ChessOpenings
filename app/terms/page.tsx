// app/terms/page.tsx
import Link from "next/link";
import {
  FaGavel,
  FaUserShield,
  FaExclamationTriangle,
  FaBalanceScale,
} from "react-icons/fa";
import { Footer } from "../../components/footer";

const TermsPage = () => {
  const lastUpdated = "November 5, 2025";

  const sections = [
    {
      icon: FaGavel,
      title: "Acceptance of Terms",
      content: `By accessing and using ChessMaster ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.`,
    },
    {
      icon: FaUserShield,
      title: "User Accounts",
      content: `You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.`,
    },
    {
      icon: FaExclamationTriangle,
      title: "Prohibited Uses",
      content: `You may not use the Service for any illegal or unauthorized purpose. You must not, in the use of the Service, violate any laws in your jurisdiction.`,
    },
    {
      icon: FaBalanceScale,
      title: "Intellectual Property",
      content: `The Service and its original content, features, and functionality are owned by ChessMaster and are protected by international copyright, trademark, and other intellectual property laws.`,
    },
  ];

  const prohibitedActivities = [
    "Cheating in online games or tournaments (Soon...)",
    "Automated data scraping without permission",
    "Distributing malware or harmful code",
    "Spamming other users",
    "Impersonating other individuals or entities",
    "Violating any applicable laws or regulations",
  ];

  return (
    <div className="min-h-screen  text-white flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-linear-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
                Terms of Service
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
                Please read these terms carefully before using our Service.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <section
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700"
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20 mr-4">
                    <section.icon className="h-6 w-6 text-yellow-400" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    {section.title}
                  </h2>
                </div>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {section.content}
                </p>
              </section>
            ))}

            {/* Prohibited Activities */}
            <section className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Prohibited Activities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prohibitedActivities.map((activity, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                    <span className="text-gray-300">{activity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Service Terms */}
            <section className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Service Terms
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Free Service
                  </h3>
                  <p className="text-gray-300">
                    ChessMaster is provided as a free service. We reserve the
                    right to modify or discontinue, temporarily or permanently,
                    the Service with or without notice.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Termination
                  </h3>
                  <p className="text-gray-300">
                    We may terminate or suspend access to our Service
                    immediately, without prior notice or liability, for any
                    reason whatsoever, including without limitation if you
                    breach the Terms.
                  </p>
                </div>
              </div>
            </section>

            {/* Disclaimer */}
            <section className="bg-red-900/20 backdrop-blur-sm rounded-2xl p-8 border border-red-700/50">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Disclaimer
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK. THE SERVICE IS
                PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot;
                BASIS.
              </p>
              <p className="text-gray-300 leading-relaxed">
                ChessMaster does not warrant that the Service will be
                uninterrupted, timely, secure, or error-free.
              </p>
            </section>

            {/* Contact for Questions */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Questions About Our Terms?
              </h2>
              <p className="text-gray-300 mb-6">
                If you have any questions about these Terms of Service, please
                contact us.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-yellow-500 text-slate-900 font-semibold rounded-xl hover:bg-yellow-400 transition-all duration-300 border-2 border-yellow-500 hover:border-yellow-400"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsPage;
