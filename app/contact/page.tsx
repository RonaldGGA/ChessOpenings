import { 
  FaEnvelope, 
  FaTwitter, 
  FaGithub, 
  FaMapMarkerAlt, 
  FaPaperPlane,
  FaClock
} from 'react-icons/fa';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';

const ContactPage = () => {
  const contactMethods = [
    {
      icon: FaEnvelope,
      title: 'Email Us',
      description: 'Send us an email anytime',
      value: 'hello@chessmaster.com',
      link: 'mailto:hello@chessmaster.com'
    },
    {
      icon: FaTwitter,
      title: 'Twitter',
      description: 'Follow and message us',
      value: '@chessmaster',
      link: 'https://twitter.com/chessmaster'
    },
    {
      icon: FaGithub,
      title: 'GitHub',
      description: 'Check out our projects',
      value: 'github.com/chessmaster',
      link: 'https://github.com/chessmaster'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Based In',
      description: 'Our headquarters',
      value: 'Global Remote Team',
      link: null
    }
  ];

  const faqs = [
    {
      question: 'Is ChessMaster completely free?',
      answer: 'Yes, ChessMaster is completely free to use. We believe in making quality chess education accessible to everyone.'
    },
    {
      question: 'How often is the opening database updated?',
      answer: 'Our opening database is continuously updated with new variations and analysis from professional games.'
    },
    {
      question: 'Can I suggest new features?',
      answer: 'Absolutely! We welcome feature suggestions from our community. Contact us through any channel.'
    },
    {
      question: 'Do you offer premium coaching?',
      answer: 'Currently we focus on providing free tools, but we may introduce premium coaching services in the future.'
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8 md:py-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-linear-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
              Get In Touch
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Have questions, suggestions, or need support? We&apos;d love to hear from you. 
            Reach out through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-white">Contact Information</h2>
            
            {/* Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {contactMethods.map((method, index) => (
                <div 
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-yellow-500/50 transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20 mr-4">
                      <method.icon className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{method.title}</h3>
                      <p className="text-gray-400 text-sm">{method.description}</p>
                    </div>
                  </div>
                  {method.link ? (
                    <a 
                      href={method.link}
                      className="text-yellow-400 hover:text-yellow-300 transition-colors text-sm"
                    >
                      {method.value}
                    </a>
                  ) : (
                    <p className="text-gray-300 text-sm">{method.value}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Support Hours */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20 mr-4">
                  <FaClock className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Support Hours</h3>
                  <p className="text-gray-400 text-sm">When you can reach our team</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Monday - Friday</span>
                  <span className="text-yellow-400">9:00 AM - 6:00 PM UTC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Saturday - Sunday</span>
                  <span className="text-yellow-400">10:00 AM - 4:00 PM UTC</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <h2 className="text-3xl font-bold mb-6 text-white">Send us a Message</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 text-white placeholder-gray-500 transition-colors"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 text-white placeholder-gray-500 transition-colors"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 text-white placeholder-gray-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 text-white transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="support">Technical Support</option>
                    <option value="feature">Feature Request</option>
                    <option value="bug">Bug Report</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 text-white placeholder-gray-500 transition-colors resize-vertical"
                    placeholder="Tell us how we can help you or just tell us your thoughts :)"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-yellow-500 text-slate-900 font-semibold rounded-xl hover:bg-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-yellow-500/25 border-2 border-yellow-500 hover:border-yellow-400 flex items-center justify-center gap-3"
                >
                  <FaPaperPlane className="h-5 w-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700"
              >
                <h3 className="font-bold text-white text-lg mb-2">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default ContactPage;