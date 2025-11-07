import { FaUsers, FaRocket, FaAward } from "react-icons/fa";
import { Target } from "lucide-react";
import { Footer } from "../../components/footer";

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Founder & Grandmaster",
      bio: "FIDE Master with 15+ years of competitive chess experience",
      achievements: ["FIDE Rating 2450", "National Champion 2022"],
    },
    {
      name: "Ronald Gonzalez",
      role: "Web Developer",
      bio: "Full-stack developer passionate about chess and education",
      achievements: ["2+ years development experience", "Chess enthusiast"],
    },
    {
      name: "Marcus Johnson",
      role: "Chess Coach",
      bio: "Professional chess coach specializing in opening theory",
      achievements: ["FIDE Trainer", "500+ students coached"],
    },
  ];

  const milestones = [
    { year: "2023", event: "Platform Concept & Research" },
    { year: "2024", event: "Development & Beta Testing" },
    { year: "2025", event: "Official Launch & Community Growth" },
  ];

  return (
    <div className="min-h-screen  text-white flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8 md:py-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-linear-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
              About ChessMaster
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Empowering chess players worldwide with professional tools,
            comprehensive resources, and cutting-edge technology to master the
            royal game.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 mr-4">
                <Target className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Our Mission</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              To democratize chess education by providing free,
              professional-grade training tools that help players of all levels
              improve their opening repertoire and overall game strategy.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20 mr-4">
                <FaRocket className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Our Vision</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              To become the world&apos;s most comprehensive chess training
              platform, integrating artificial intelligence, community features,
              and professional coaching tools.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-yellow-500/50 transition-all duration-300"
              >
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <FaUsers className="h-8 w-8 text-slate-900" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-yellow-400 mb-3">{member.role}</p>
                  <p className="text-gray-300 text-sm mb-4">{member.bio}</p>
                  <div className="border-t border-slate-700 pt-4">
                    <h4 className="text-sm font-semibold text-white mb-2">
                      Achievements:
                    </h4>
                    <ul className="text-xs text-gray-400 space-y-1">
                      {member.achievements.map((achievement, idx) => (
                        <li key={idx}>• {achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Our Journey
          </h2>
          <div className="max-w-2xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center mb-8 last:mb-0">
                <div className="shrink-0 w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mr-6">
                  <span className="text-slate-900 font-bold">
                    {milestone.year}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-white text-lg">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
              <FaAward className="h-8 w-8 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Excellence</h3>
              <p className="text-gray-300 text-sm">
                Commitment to providing the highest quality chess training tools
                and resources
              </p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
              <FaUsers className="h-8 w-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                Accessibility
              </h3>
              <p className="text-gray-300 text-sm">
                Making professional chess education available to everyone, for
                free
              </p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
              <FaRocket className="h-8 w-8 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Innovation</h3>
              <p className="text-gray-300 text-sm">
                Continuously improving and integrating cutting-edge technology
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
