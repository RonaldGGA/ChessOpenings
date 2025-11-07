import Link from "next/link";
import { ArrowLeft, Code, Zap, Shield, Database } from "lucide-react";

export default function ApiOverviewPage() {
  const apis = [
    {
      name: "Authentication API",
      description: "User registration, login, and session management",
      endpoint: "/api/auth/*",
      methods: ["POST"],
      auth: "None for registration",
      icon: Shield,
      color: "text-green-600",
      href: "/documentation/api/auth",
    },
    {
      name: "User Favorites API",
      description: "Manage user's favorite chess openings",
      endpoint: "/api/user/favorites",
      methods: ["GET", "POST"],
      auth: "Required",
      icon: Zap,
      color: "text-yellow-600",
      href: "/documentation/api/user/favorites",
    },
    {
      name: "User Visits API",
      description: "Track and retrieve user visits to openings",
      endpoint: "/api/user/visits",
      methods: ["GET", "POST"],
      auth: "Required",
      icon: Database,
      color: "text-blue-600",
      href: "/documentation/api/user/visits",
    },
    {
      name: "Practice Sessions API",
      description: "Save and retrieve chess practice sessions",
      endpoint: "/api/user/practice-sessions",
      methods: ["GET", "POST"],
      auth: "Required",
      icon: Code,
      color: "text-purple-600",
      href: "/documentation/api/user/practice-sessions",
    },
    {
      name: "Openings API",
      description: "Search and browse chess openings database",
      endpoint: "/api/openings",
      methods: ["GET"],
      auth: "Optional",
      icon: Database,
      color: "text-indigo-600",
      href: "/documentation/api/openings",
    },
    {
      name: "Opening Match API",
      description: "Real-time opening identification from moves",
      endpoint: "/api/openings/match",
      methods: ["GET"],
      auth: "None",
      icon: Zap,
      color: "text-red-600",
      href: "/documentation/api/openings/match",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <Link
            href="/documentation"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Documentation
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            API Reference
          </h1>
          <p className="text-xl text-slate-600">
            Complete documentation for all ChessMaster APIs. All endpoints
            return JSON responses.
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            Base URL
          </h2>
          <code className="bg-white px-3 py-2 rounded-lg border text-sm font-mono">
            {process.env.NEXT_PUBLIC_BASE_URL ||
              "https://chess-openings-indol.vercel.app"}
          </code>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            Authentication
          </h2>
          <p className="text-slate-700 mb-2">
            Most endpoints require authentication using NextAuth.js sessions.
            Include valid session credentials in your requests.
          </p>
          <p className="text-sm text-slate-600">
            Unauthenticated requests to protected endpoints will receive a{" "}
            <code className="bg-white px-1 py-0.5 rounded text-xs">
              401 Unauthorized
            </code>{" "}
            response.
          </p>
        </div>

        <div className="grid gap-6">
          {apis.map((api) => (
            <Link
              key={api.name}
              href={api.href}
              className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <api.icon className={`h-5 w-5 ${api.color} mr-3`} />
                    <h3 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {api.name}
                    </h3>
                  </div>
                  <p className="text-slate-600 mb-4">{api.description}</p>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div>
                      <span className="font-medium text-slate-700">
                        Endpoint:
                      </span>
                      <code className="ml-2 bg-slate-100 px-2 py-1 rounded font-mono">
                        {api.endpoint}
                      </code>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">
                        Methods:
                      </span>
                      <span className="ml-2">
                        {api.methods.map((method) => (
                          <span
                            key={method}
                            className="inline-block bg-slate-100 px-2 py-1 rounded font-mono text-xs mr-1"
                          >
                            {method}
                          </span>
                        ))}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Auth:</span>
                      <span
                        className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                          api.auth === "Required"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {api.auth}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-slate-400 group-hover:text-blue-600 transition-colors">
                  <ArrowLeft className="h-5 w-5 transform rotate-180" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-slate-900 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Quick Start Example</h2>
          <div className="bg-slate-800 rounded-lg p-6 mb-4">
            <pre className="text-sm text-slate-200 overflow-x-auto">
              {`// Search for chess openings
const response = await fetch('/api/openings?search=sicilian&limit=10');
const data = await response.json();

// Add to favorites (authenticated)
const favoriteResponse = await fetch('/api/user/favorites', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    openingId: 'opening-123',
    action: 'add'
  })
});`}
            </pre>
          </div>
          <p className="text-slate-300">
            Check individual API documentation for detailed request/response
            formats and authentication requirements.
          </p>
        </div>
      </div>
    </div>
  );
}
