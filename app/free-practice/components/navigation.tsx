// components/Navigation.tsx
"use client";

import Link from "next/link";
import { Home, Search, Menu, X } from "lucide-react";
import UserButton from "@/app/components/userButton";

interface NavigationProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const Navigation = ({ mobileMenuOpen, setMobileMenuOpen }: NavigationProps) => {
  const handleClick = () => {
    setMobileMenuOpen(false);
  };
  return (
    <nav className="bg-slate-800/30 backdrop-blur-sm border-b border-slate-700/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="h-8 w-8 bg-yellow-400 rounded-lg flex items-center justify-center group-hover:bg-yellow-300 transition-colors">
                <span className="text-slate-900 font-bold text-lg">♔</span>
              </div>
              <div className="absolute inset-0 bg-yellow-400/20 rounded-lg group-hover:bg-yellow-400/30 transition-colors blur-sm"></div>
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              ChessMaster
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors group"
            >
              <Home className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span>Home</span>
            </Link>
            <Link
              href="/explore"
              className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors group"
            >
              <Search className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span>Explore</span>
            </Link>
            <div className="h-6 w-px bg-slate-600"></div>
            <UserButton />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-700/50 border border-slate-600 hover:border-yellow-500/50 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="flex column-2 md:hidden py-4 border-t border-slate-700/50">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-colors py-2"
                onClick={() => handleClick()}
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
              <Link
                href="/explore"
                className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-colors py-2"
                onClick={() => handleClick()}
              >
                <Search className="h-5 w-5" />
                <span>Explore Openings</span>
              </Link>
            </div>
            <div className="flex-1 flex justify-end">
              <UserButton />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
