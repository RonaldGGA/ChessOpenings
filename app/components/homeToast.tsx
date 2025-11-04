"use client";

import { useEffect, useState } from 'react';
import { FaTimes, FaGithub, FaEnvelope } from 'react-icons/fa';

export default function HomeToast() {
  const [showToast, setShowToast] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Solo ejecutar en el cliente
  useEffect(() => {
    const changeSetMounted = () =>{
        setIsMounted(true);
    }
    changeSetMounted()
    const hasSeenToast = localStorage.getItem('hasSeenHomeToast');
    
    if (!hasSeenToast) {
      const timer = setTimeout(() => {
        setShowToast(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseToast = () => {
    setShowToast(false);
    localStorage.setItem('hasSeenHomeToast', 'true');
  };

  const handleGithubClick = () => {
    window.open('https://github.com/tu-usuario/tu-repo', '_blank');
    handleCloseToast();
  };

  const handleContactClick = () => {
    window.location.href = '/contact';
    handleCloseToast();
  };

  // No renderizar nada hasta que se monte en el cliente
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {showToast && (
        <div className="fixed bottom-4 right-4 left-4 md:left-auto md:right-4 z-50 max-w-md animate-fade-in-up">
          <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-4 border border-yellow-500/30 shadow-2xl shadow-yellow-500/10">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-yellow-400 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                Welcome to ChessMaster! 🎉
              </h3>
              <button
                onClick={handleCloseToast}
                className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-700/50"
              >
                <FaTimes className="h-3 w-3" />
              </button>
            </div>
            <p className="text-gray-300 text-sm mb-3">
              Time for some support?  Star our GitHub repo or leave feedback to help us improve!
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleGithubClick}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 rounded-xl text-gray-300 hover:text-white transition-all duration-200 text-sm font-medium"
              >
                <FaGithub className="h-3 w-3" />
                Star on GitHub
              </button>
              <button
                onClick={handleContactClick}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 rounded-xl text-yellow-400 hover:text-yellow-300 transition-all duration-200 text-sm font-medium"
              >
                <FaEnvelope className="h-3 w-3" />
                Leave Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}