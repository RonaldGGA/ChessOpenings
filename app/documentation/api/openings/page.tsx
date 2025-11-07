import Link from "next/link";
import { ArrowLeft, XCircle, Search, Filter } from "lucide-react";

export default function OpeningsApiPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Link
            href="/documentation/api"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to API Reference
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Openings API
          </h1>
          <p className="text-xl text-slate-600">
            Search and browse the chess openings database with advanced
            filtering and sorting options.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mr-4">
              GET
            </div>
            <code className="bg-slate-100 px-3 py-1 rounded text-sm font-mono">
              /api/openings
            </code>
          </div>

          <p className="text-slate-700 mb-6">
            Retrieves a paginated list of chess openings with extensive
            filtering and sorting options.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Query Parameters
          </h3>
          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b border-slate-200">
                <code className="font-mono text-sm">page</code>
                <div className="text-slate-600 text-sm">
                  number (optional, default: 1)
                </div>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-200">
                <code className="font-mono text-sm">limit</code>
                <div className="text-slate-600 text-sm">
                  number (optional, default: 20)
                </div>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-200">
                <code className="font-mono text-sm">search</code>
                <div className="text-slate-600 text-sm">string (optional)</div>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-200">
                <code className="font-mono text-sm">eco</code>
                <div className="text-slate-600 text-sm">string (optional)</div>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-200">
                <code className="font-mono text-sm">sort</code>
                <div className="text-slate-600 text-sm">
                  popular, favorites, recent, name, eco (optional, default:
                  popular)
                </div>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-200">
                <code className="font-mono text-sm">favoritesOnly</code>
                <div className="text-slate-600 text-sm">
                  boolean (optional, default: false)
                </div>
              </div>
              <div className="flex justify-between items-center py-2">
                <code className="font-mono text-sm">userId</code>
                <div className="text-slate-600 text-sm">
                  string (optional, for personalized data)
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Example Requests
          </h3>
          <div className="bg-slate-900 rounded-lg p-4 mb-6">
            <pre className="text-sm text-slate-200 overflow-x-auto">
              {`// Get popular openings with pagination
const response = await fetch('/api/openings?page=1&limit=20&sort=popular');

// Search for Sicilian Defense variations
const response = await fetch('/api/openings?search=sicilian&sort=name');

// Filter by ECO code and show user favorites
const response = await fetch('/api/openings?eco=C60&favoritesOnly=true&userId=user123');

// Get all openings sorted by name
const response = await fetch('/api/openings?sort=name&limit=50');`}
            </pre>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Success Response
          </h3>
          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <pre className="text-sm text-slate-800 overflow-x-auto">
              {`{
  "openings": [
    {
      "id": "string",
      "fen": "string",
      "name": "Ruy Lopez",
      "eco": "C60",
      "moves": "1. e4 e5 2. Nf3 Nc6 3. Bb5",
      "src": "string",
      "scid": "string",
      "isEcoRoot": true,
      "aliases": [
        {
          "id": "string",
          "value": "Spanish Opening",
          "source": "string",
          "openingId": "string"
        }
      ],
      "totalVisits": 150,
      "totalFavorites": 25,
      "totalPracticeSessions": 75,
      "isFavorite": true,
      "userVisitCount": 5
    }
  ],
  "ecoOptions": ["A00", "A01", "B20", "C60", "D00"],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasMore": true
  }
}`}
            </pre>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Error Response
          </h3>
          <div className="border-l-4 border-red-500 bg-red-50 p-4">
            <div className="flex items-center mb-2">
              <XCircle className="h-5 w-5 text-red-600 mr-2" />
              <span className="font-semibold text-red-900">
                500 Internal Server Error
              </span>
            </div>
            <div className="bg-white rounded p-3 mt-2">
              <pre className="text-sm text-slate-800 overflow-x-auto">
                {`{
  "error": "Internal server error"
}`}
              </pre>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Search & Filtering
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-3">
                <Search className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="font-semibold text-slate-900">
                  Search Functionality
                </h3>
              </div>
              <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
                <li>
                  <strong>Opening Name:</strong> Case-insensitive partial
                  matching
                </li>
                <li>
                  <strong>ECO Code:</strong> Exact or partial ECO code matching
                </li>
                <li>
                  <strong>Move Sequences:</strong> Partial move sequence
                  matching
                </li>
                <li>
                  <strong>Aliases:</strong> Alternative opening names
                </li>
              </ul>
            </div>
            <div>
              <div className="flex items-center mb-3">
                <Filter className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="font-semibold text-slate-900">
                  Filtering Options
                </h3>
              </div>
              <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
                <li>
                  <strong>ECO Filtering:</strong> Filter by exact ECO code match
                </li>
                <li>
                  <strong>Favorites Filter:</strong> Only show user&apos;s
                  favorite openings
                </li>
                <li>
                  <strong>User-Specific Data:</strong> Include personalized data
                  when userId provided
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Sorting Options
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-slate-200">
              <code className="font-mono text-sm">popular</code>
              <div className="text-slate-600 text-sm">
                Most visited openings (descending by totalVisits)
              </div>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-200">
              <code className="font-mono text-sm">favorites</code>
              <div className="text-slate-600 text-sm">
                Most favorited openings (descending by totalFavorites)
              </div>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-200">
              <code className="font-mono text-sm">recent</code>
              <div className="text-slate-600 text-sm">
                Default sorting (ascending by eco, then name)
              </div>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-200">
              <code className="font-mono text-sm">name</code>
              <div className="text-slate-600 text-sm">
                Alphabetical by opening name (ascending by name)
              </div>
            </div>
            <div className="flex justify-between items-center py-2">
              <code className="font-mono text-sm">eco</code>
              <div className="text-slate-600 text-sm">
                By ECO classification code (ascending by eco, then name)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
