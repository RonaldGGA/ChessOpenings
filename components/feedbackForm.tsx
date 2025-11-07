// components/FeedbackForm.tsx
"use client";

import { 
  FaPaperPlane,
  FaCheck,
  FaExclamationTriangle,
  FaStar
} from 'react-icons/fa';
import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
  rating: number;
}

export function FeedbackForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const API_URL = process.env.FEEDBACK_API_BASE_URL || 'https://feedbackapi-production-eaaf.up.railway.app';
      
      const response = await fetch(`${API_URL}/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...formData, project:"ChessMaster"}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          message: '',
          rating: 5
        });
        setTimeout(() => window.location.reload(), 2000);
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : 'Connection error. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const SubmitStatusMessage = () => {
    if (submitStatus === 'success') {
      return (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
          <div className="flex items-center space-x-3">
            <FaCheck className="h-5 w-5 text-green-400 shrink-0" />
            <div>
              <p className="text-green-400 font-medium">Thank you for your feedback!</p>
              <p className="text-green-300 text-sm mt-1">
                Your message has been sent successfully.
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (submitStatus === 'error') {
      return (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
          <div className="flex items-start space-x-3">
            <FaExclamationTriangle className="h-5 w-5 text-red-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-red-400 font-medium">Failed to send</p>
              <p className="text-red-300 text-sm mt-1">
                {errorMessage}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  const StarRating = ({ rating, onChange, interactive = false }: { 
    rating: number; 
    onChange?: (rating: number) => void;
    interactive?: boolean;
  }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onChange?.(star)}
            className={`${
              interactive 
                ? 'cursor-pointer hover:scale-110 transition-transform' 
                : 'cursor-default'
            } ${
              star <= rating 
                ? 'text-yellow-400' 
                : 'text-gray-600'
            }`}
            disabled={!interactive || isSubmitting}
          >
            <FaStar className="w-5 h-5" />
          </button>
        ))}
      </div>
    );
  };

  return (
    <section 
      id="feedback-form"
      className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 sticky top-8"
    >
      <header className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">
          Leave Your Feedback
        </h2>
        <p className="text-gray-300">
          Share your thoughts, ideas, or just say hello
        </p>
      </header>
      
      <SubmitStatusMessage />
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-yellow-500 text-white placeholder-gray-500 transition-colors"
            placeholder="What's your name?"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-yellow-500 text-white placeholder-gray-500 transition-colors"
            placeholder="your.email@example.com"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            How would you rate my portfolio?
          </label>
          <div className="flex items-center space-x-2">
            <StarRating 
              rating={formData.rating} 
              onChange={handleRatingChange}
              interactive={!isSubmitting}
            />
            <span className="text-yellow-400 text-sm ml-2">
              {formData.rating}/5
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            Your Message *
          </label>
          <textarea
            id="message"
            rows={6}
            value={formData.message}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-yellow-500 text-white placeholder-gray-500 transition-colors resize-y"
            placeholder="What did you think of my work? Any suggestions? Tell me!"
            required
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-yellow-500 text-slate-900 font-semibold rounded-xl hover:bg-yellow-400 transition-all duration-300 border-2 border-yellow-500 hover:border-yellow-400 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900"></div>
              Sending...
            </>
          ) : (
            <>
              <FaPaperPlane className="h-5 w-5" />
              Send Feedback
            </>
          )}
        </button>
      </form>
    </section>
  );
}