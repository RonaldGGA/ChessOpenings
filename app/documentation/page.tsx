import Link from "next/link";
import {
  FileText,
  Key,
  Server,
  Code,
  BookOpen,
  Component,
  ArrowLeft,
} from "lucide-react";
import { FaChess } from "react-icons/fa";

export default function DocumentationPage() {
  const sections = [
    {
      title: "API Reference",
      description:
        "Complete API documentation for all endpoints and integration examples.",
      icon: Component,
      color: "text-blue-600",
      links: [
        {
          name: "API Overview",
          href: "/documentation/api",
          description: "All available APIs",
        },
      
      ],
    },
     {
      title: "Game Logic",
      description:
        "Complete Chess Logic documentation",
      icon: FaChess,
      color: "text-red-600",
      links: [
        {
          name: "Chess Game Logic Overview",
          href: "/documentation/game-logic",
          description: "Deep explanation of the logic behind",
        },
      
      ],
    },
    {
      title: "Server Actions",
      description:
        "Utility functions and data fetching patterns used throughout the application.",
      icon: Server,
      color: "text-green-600",
      links: [
        {
          name: "Server Actions Overview",
          href: "/documentation/server-actions",
          description: "Data fetching utilities",
        },
      ],
    },
    {
      title: "Authentication System",
      description:
        "Learn about the authentication system, including OAuth and credential flows.",
      icon: Key,
      color: "text-purple-600",
      links: [
        {
          name: "Authentication System",
          href: "/documentation/authentication-system",
          description: "Complete auth flow",
        },
      ],
    },
    {
      title: "Utilities & Helpers",
      description:
        "Reusable functions and utilities for opening data and user analytics.",
      icon: Code,
      color: "text-orange-600",
      links: [
        {
          name: "Utility Functions",
          href: "/documentation/utilities",
          description: "Helper functions",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl mb-5">
        <div className="text-center text-lg mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-6 w-6 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-slate-900">
              ChessMaster Documentation
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Welcome to the ChessMaster documentation. Everything you need to
            know about APIs, authentication, and integration.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-slate-200">
            <div className="text-2xl font-bold text-blue-600">7</div>
            <div className="text-sm text-slate-600">API Endpoints</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-slate-200">
            <div className="text-2xl font-bold text-green-600">3</div>
            <div className="text-sm text-slate-600">Auth Methods</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-slate-200">
            <div className="text-2xl font-bold text-purple-600">1000+</div>
            <div className="text-sm text-slate-600">Chess Openings</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-slate-200">
            <div className="text-2xl font-bold text-orange-600">Real-time</div>
            <div className="text-sm text-slate-600">Analysis</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {sections.map((section) => (
            <div
              key={section.title}
              className="bg-white rounded-xl shadow-md p-6 border border-slate-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <section.icon className={`h-6 w-6 ${section.color} mr-3`} />
                <h2 className="text-2xl font-semibold text-slate-800">
                  {section.title}
                </h2>
              </div>
              <p className="text-slate-600 mb-6">{section.description}</p>
              <div className="space-y-3">
                {section.links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-start p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                  >
                    <FileText className="h-5 w-5 text-slate-400 mr-3 mt-0.5 group-hover:text-blue-600 transition-colors" />
                    <div>
                      <div className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                        {link.name}
                      </div>
                      <div className="text-sm text-slate-500">
                        {link.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
