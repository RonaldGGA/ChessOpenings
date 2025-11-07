import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function UserFavoritesApiPage() {
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
            User Favorites API
          </h1>
          <p className="text-xl text-slate-600">
            Manage user&apos;s favorite chess openings with add/remove
            functionality and paginated retrieval.
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
          <div className="flex items-center mb-2">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <h2 className="text-lg font-semibold text-red-900">
              Authentication Required
            </h2>
          </div>
          <p className="text-red-700">
            All endpoints in this API require valid user authentication.
            Unauthenticated requests will receive 401 Unauthorized.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mr-4">
              POST
            </div>
            <code className="bg-slate-100 px-3 py-1 rounded text-sm font-mono">
              /api/user/favorites
            </code>
          </div>

          <p className="text-slate-700 mb-6">
            Adds or removes an opening from the user&apos;s favorites list.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Request Body
          </h3>
          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <pre className="text-sm text-slate-800 overflow-x-auto">
              {`{
  "openingId": "string (required)",
  "action": "string (required, enum: ['add', 'remove'])"
}`}
            </pre>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Example Request
          </h3>
          <div className="bg-slate-900 rounded-lg p-4 mb-6">
            <pre className="text-sm text-slate-200 overflow-x-auto">
              {`// Add to favorites
const response = await fetch('/api/user/favorites', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    openingId: 'clk9x8d4q0001vq2o6q7q8r9s',
    action: 'add'
  })
});

// Remove from favorites
const response = await fetch('/api/user/favorites', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    openingId: 'clk9x8d4q0001vq2o6q7q8r9s',
    action: 'remove'
  })
});`}
            </pre>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Responses
          </h3>

          <div className="space-y-4">
            <div className="border-l-4 border-green-500 bg-green-50 p-4">
              <div className="flex items-center mb-2">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span className="font-semibold text-green-900">
                  200 OK - Added to Favorites
                </span>
              </div>
              <div className="bg-white rounded p-3 mt-2">
                <pre className="text-sm text-slate-800 overflow-x-auto">
                  {`{
  "favorite": {
    "id": "string",
    "userId": "string",
    "openingId": "string",
    "createdAt": "string"
  },
  "action": "added"
}`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
              <div className="flex items-center mb-2">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-semibold text-blue-900">
                  200 OK - Removed from Favorites
                </span>
              </div>
              <div className="bg-white rounded p-3 mt-2">
                <pre className="text-sm text-slate-800 overflow-x-auto">
                  {`{
  "action": "removed"
}`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4">
              <div className="flex items-center mb-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="font-semibold text-yellow-900">
                  200 OK - Already in Favorites
                </span>
              </div>
              <div className="bg-white rounded p-3 mt-2">
                <pre className="text-sm text-slate-800 overflow-x-auto">
                  {`{
  "message": "Already in favorites"
}`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-red-500 bg-red-50 p-4">
              <div className="flex items-center mb-2">
                <XCircle className="h-5 w-5 text-red-600 mr-2" />
                <span className="font-semibold text-red-900">
                  400 Bad Request - Validation Error
                </span>
              </div>
              <div className="bg-white rounded p-3 mt-2">
                <pre className="text-sm text-slate-800 overflow-x-auto">
                  {`{
  "error": "Missing openingId or action"
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mr-4">
              GET
            </div>
            <code className="bg-slate-100 px-3 py-1 rounded text-sm font-mono">
              /api/user/favorites
            </code>
          </div>

          <p className="text-slate-700 mb-6">
            Retrieves a paginated list of the authenticated user&apos;s favorite
            openings.
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
              <div className="flex justify-between items-center py-2">
                <code className="font-mono text-sm">limit</code>
                <div className="text-slate-600 text-sm">
                  number (optional, default: 20)
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Example Request
          </h3>
          <div className="bg-slate-900 rounded-lg p-4 mb-6">
            <pre className="text-sm text-slate-200 overflow-x-auto">
              {`// Fetch first page with custom limit
const response = await fetch('/api/user/favorites?page=1&limit=10');
const data = await response.json();

console.log(data.favorites);    // Array of opening objects
console.log(data.total);        // Total number of favorites
console.log(data.page);         // Current page number
console.log(data.totalPages);   // Total number of pages`}
            </pre>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Success Response
          </h3>
          <div className="bg-slate-50 rounded-lg p-4">
            <pre className="text-sm text-slate-800 overflow-x-auto">
              {`{
  "favorites": [
    {
      "id": "string",
      "name": "Ruy Lopez",
      "eco": "C60",
      "fen": "string",
      "pgn": "string",
      "totalFavorites": 15,
      "aliases": [
        {
          "id": "string",
          "name": "Spanish Opening",
          "openingId": "string"
        }
      ]
    }
  ],
  "total": 45,
  "page": 1,
  "totalPages": 3
}`}
            </pre>
          </div>
        </div>

        {/* Business Logic */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Business Logic
          </h2>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 shrink-0" />
              <span>
                <strong>Duplicate Prevention:</strong> API prevents duplicate
                favorites by checking existence before adding
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 shrink-0" />
              <span>
                <strong>Atomic Counters:</strong> The{" "}
                <code>totalFavorites</code> counter on openings is automatically
                incremented/decremented
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 shrink-0" />
              <span>
                <strong>Pagination:</strong> Results are paginated to optimize
                performance for large datasets
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 shrink-0" />
              <span>
                <strong>Data Integrity:</strong> All operations maintain
                referential integrity between users, favorites, and openings
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
