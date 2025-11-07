// components/scrollToTop.tsx
"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

interface ScrollToTopProps {
  showAfter?: number;
  smoothScroll?: boolean;
  className?: string;
}

const ScrollToTop = ({
  showAfter = 300,
  smoothScroll = true,
  className = "",
}: ScrollToTopProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const changeIsMounted = () => {
      setIsMounted(true);
    };
    changeIsMounted();

    const toggleVisibility = () => {
      if (typeof window === "undefined") return;

      const scrolled = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (scrolled > showAfter) {
        setIsVisible(true);
        setScrollProgress((scrolled / height) * 100);
      } else {
        setIsVisible(false);
        setScrollProgress(0);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [showAfter]);

  const scrollToTop = () => {
    if (typeof window === "undefined") return;

    if (smoothScroll) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${className}`}
    >
      {isVisible && (
        <div className="relative">
          <svg
            className="absolute -top-1 -left-1 w-14 h-14 transform -rotate-90"
            viewBox="0 0 36 36"
          >
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="rgba(234, 179, 8, 0.3)"
              strokeWidth="2"
            />
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="#eab308"
              strokeWidth="2"
              strokeDasharray="100"
              strokeDashoffset={100 - scrollProgress}
              strokeLinecap="round"
            />
          </svg>

          <button
            onClick={scrollToTop}
            className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border-2 border-yellow-500 hover:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 relative"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ScrollToTop;
