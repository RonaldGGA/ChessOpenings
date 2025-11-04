"use client";

import { 
  FaEnvelope, 
  FaTwitter, 
  FaGithub, 
  FaMapMarkerAlt, 
  FaPaperPlane,
  FaClock,
  FaCheck,
  FaExclamationTriangle
} from 'react-icons/fa';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Reemplaza esta URL con la de tu API real
      const API_URL = process.env.NEXT_PUBLIC_CONTACT_API_URL || '/api/contact';
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Estructura del objeto que se enviará a tu API
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          subject: formData.subject,
          message: formData.message.trim(),
          timestamp: new Date().toISOString(),
          source: 'chessmaster-website'
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Resetear el formulario
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : 'Failed to send message. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Componente para mostrar el estado del envío
  const SubmitStatusMessage = () => {
    if (submitStatus === 'success') {
      return (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl animate-fade-in">
          <div className="flex items-center space-x-3">
            <FaCheck className="h-5 w-5 text-green-400 shrink-0" />
            <div>
              <p className="text-green-400 font-medium">Message sent successfully!</p>
              <p className="text-green-300 text-sm mt-1">
                Thank you for contacting us. We&apos;ll get back to you as soon as possible.
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (submitStatus === 'error') {
      return (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl animate-fade-in">
          <div className="flex items-start space-x-3">
            <FaExclamationTriangle className="h-5 w-5 text-red-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-red-400 font-medium">Failed to send message</p>
              <p className="text-red-300 text-sm mt-1">
                {errorMessage || 'Please try again later or contact us through other channels.'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

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
                      target="_blank"
                      rel="noopener noreferrer"
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
              
              {/* Status Messages */}
              <SubmitStatusMessage />
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 text-white placeholder-gray-500 transition-colors"
                      placeholder="Your first name"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 text-white placeholder-gray-500 transition-colors"
                      placeholder="Your last name"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 text-white placeholder-gray-500 transition-colors"
                    placeholder="your.email@example.com"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 text-white transition-colors"
                    required
                    disabled={isSubmitting}
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
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 text-white placeholder-gray-500 transition-colors resize-vertical"
                    placeholder="Tell us how we can help you or just tell us your thoughts :)"
                    required
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-yellow-500 text-slate-900 font-semibold rounded-xl hover:bg-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-yellow-500/25 border-2 border-yellow-500 hover:border-yellow-400 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>
                
                <p className="text-gray-400 text-xs text-center">
                  * Required fields
                </p>
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