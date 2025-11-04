import Link from "next/link";
import React from "react";
import { FaChessKing, FaGithub, FaTwitter } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-slate-800/30 backdrop-blur-sm border-t border-slate-700/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-3 group mb-4">
              <FaChessKing className="h-6 w-6 text-yellow-400" />
              <span className="text-lg font-bold bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                ChessMaster
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Professional chess training platform with interactive tools and
              comprehensive opening database.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/free-practice"
                  className="text-gray-400 hover:text-yellow-400 transition-colors text-sm"
                >
                  Free Practice
                </Link>
              </li>
              <li>
                <Link
                  href="/search-openings"
                  className="text-gray-400 hover:text-yellow-400 transition-colors text-sm"
                >
                  Opening Database
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-400 hover:text-yellow-400 transition-colors text-sm"
                >
                  Progress Tracking
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about-us"
                  className="text-gray-400 hover:text-yellow-400 transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/features"
                  className="text-gray-400 hover:text-yellow-400 transition-colors text-sm"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-yellow-400 transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-yellow-400 transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-yellow-400 transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies-policy"
                  className="text-gray-400 hover:text-yellow-400 transition-colors text-sm"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Portfolio Notice - Sutil y profesional */}
        <div className="border-t border-slate-700/50 pt-6 mb-4">
          <div className="text-center">
            <p className="text-gray-500 text-xs max-w-2xl mx-auto leading-relaxed">
              <span className="text-gray-400 font-medium">Portfolio Project:</span>{" "}
              This is a demonstration website created to showcase web development skills. 
              ChessMaster is not an actual company or commercial service.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-slate-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 ChessMaster. All rights reserved.
            </div>
            <div className="text-gray-400 text-sm">
              Made with ♟️ for chess enthusiasts 
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};