import {
  FaEnvelope,
  FaTwitter,
  FaGithub,
  FaMapMarkerAlt,
  FaStar,
  FaQuoteLeft,
  FaHeart,
} from "react-icons/fa";
import { Navigation } from "../components/navigation";
import { Footer } from "../components/footer";
import { FeedbackForm } from "../components/feedbackForm";

// Types
interface Feedback {
  _id: string;
  name: string;
  email: string;
  message: string;
  rating: number;
  isFeatured: boolean;
  createdAt: string;
}

interface ContactMethod {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  value: string;
  link: string | null;
}

// Server component - fetches data on the server
async function getFeaturedFeedback(): Promise<Feedback[]> {
  try {
    const API_URL =
      process.env.FEEDBACK_API_BASE_URL || "http://localhost:5000";
    const response = await fetch(`${API_URL}/api/feedback`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.success ? result.data : [];
  } catch (error) {
    console.error("Error loading featured feedback:", error);
    return [];
  }
}

// Server Component
export default async function ContactPage() {
  const featuredFeedback = await getFeaturedFeedback();

  const contactMethods: ContactMethod[] = [
    {
      icon: FaEnvelope,
      title: "Direct Email",
      description: "Response within 24 hours",
      value: "ronald.dearmass@gmail.com",
      link: "mailto:ronald.dearmass@gmail.com",
    },
    {
      icon: FaTwitter,
      title: "Twitter",
      description: "Follow for updates",
      value: "@RonaldGGA06",
      link: "https://twitter.com/RonaldGGA06",
    },
    {
      icon: FaGithub,
      title: "GitHub",
      description: "Check out my code",
      value: "github.com/RonaldGGA",
      link: "https://github.com/RonaldGGA/ChessMaster.git",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      description: "Available remotely",
      value: "📍 Remote Work",
      link: null,
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex space-x-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={`w-3 h-3 ${
            star <= rating 
              ? 'text-yellow-400 fill-current' 
              : 'text-gray-600 fill-gray-600'
          }`}
        />
      ))}
    </div>
  );
};

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-8 md:py-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-linear-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
              Your Opinion Matters
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
            Did you like my work? Do you have ideas for improvement?
            <span className="text-yellow-400 block mt-2">
              Leave your feedback and help this portfolio grow!
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Featured Feedback */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-white">
              What Others Say
              <FaQuoteLeft className="inline ml-3 text-yellow-400 w-6 h-6" />
            </h2>

            {/* Featured Feedback - Messaging Style */}
            <div className="space-y-3 mb-8">
              {featuredFeedback.length > 0 ? (
                featuredFeedback.map((feedback) => (
                  <article
                    key={feedback._id}
                    className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50 hover:border-yellow-500/30 transition-all duration-200 message-bubble"
                  >
                    {/* Message Header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        {/* User Avatar */}
                        <div className="w-8 h-8 bg-linear-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {feedback.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </span>
                        </div>

                        {/* User Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-semibold text-sm truncate">
                            {feedback.name}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <StarRating rating={feedback.rating} />
                            <span className="text-yellow-400 text-xs">
                              {feedback.rating}/5
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Time */}
                      <time
                        className="text-gray-500 text-xs whitespace-nowrap ml-2"
                        dateTime={feedback.createdAt}
                      >
                        {formatDate(feedback.createdAt)}
                      </time>
                    </div>

                    {/* Message Content */}
                    <div className="pl-11">
                      {/* Offset to align with avatar */}
                      <blockquote className="text-gray-200 text-sm leading-relaxed">
                        {feedback.message}
                      </blockquote>
                      {/* Message Footer */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-700/30">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-500 text-xs">
                            {feedback.email}
                          </span>
                          {feedback.isFeatured && (
                            <span className="flex items-center text-yellow-400 text-xs">
                              <FaHeart className="w-3 h-3 mr-1" />
                              Featured
                            </span>
                          )}
                        </div>

                        {/* Quick Actions */}
                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="text-gray-500 hover:text-yellow-400 transition-colors p-1">
                            <FaHeart className="w-3 h-3" />
                          </button>
                          <button className="text-gray-500 hover:text-yellow-400 transition-colors p-1">
                            <svg
                              className="w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaQuoteLeft className="w-6 h-6 opacity-50" />
                  </div>
                  <p className="text-sm font-medium">No feedback yet</p>
                  <p className="text-xs mt-1">
                    Be the first to share your thoughts!
                  </p>
                </div>
              )}
            </div>

            {/* Contact Methods */}
            <section className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold mb-6 text-white">
                Other Channels
              </h3>
              <div className="space-y-4">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <div key={index} className="flex items-center">
                      <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20 mr-4">
                        <Icon className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">
                          {method.title}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {method.description}
                        </p>
                      </div>
                      {method.link ? (
                        <a
                          href={method.link}
                          className="text-yellow-400 hover:text-yellow-300 transition-colors text-sm font-medium px-3 py-1 rounded-lg hover:bg-yellow-400/10"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Contact
                        </a>
                      ) : (
                        <span className="text-gray-400 text-sm">
                          {method.value}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right Column - Feedback Form (Client Component) */}
          <div>
            <FeedbackForm />
          </div>
        </div>

        {/* Call to Action */}
        <section className="max-w-4xl mx-auto mt-16 text-center">
          <div className="bg-linear-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to work together?
            </h2>
            <p className="text-gray-300 mb-6">
              If you liked my work, let&apos;s talk about your next project
            </p>
            <a
              href="#feedback-form"
              className="inline-block px-8 py-3 bg-yellow-500 text-slate-900 font-semibold rounded-xl hover:bg-yellow-400 transition-all duration-300 border-2 border-yellow-500 hover:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-800"
            >
              Start Conversation
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
