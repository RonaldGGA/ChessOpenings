import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function UserVisitsApiPage() {
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
            User Visits API
          </h1>
          <p className="text-xl text-slate-600">
            Track and retrieve user visits to chess openings with intelligent
            deduplication.
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
              /api/user/visits
            </code>
          </div>

          <p className="text-slate-700 mb-6">
            Records a visit to a specific opening. Implements intelligent
            deduplication by updating existing visits rather than creating
            duplicates.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Request Body
          </h3>
          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <pre className="text-sm text-slate-800 overflow-x-auto">
              {`{
  "openingId": "string (required)"
}`}
            </pre>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Example Request
          </h3>
          <div className="bg-slate-900 rounded-lg p-4 mb-6">
            <pre className="text-sm text-slate-200 overflow-x-auto">
              {`const response = await fetch('/api/user/visits', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    openingId: 'clk9x8d4q0001vq2o6q7q8r9s'
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
                  200 OK - Success
                </span>
              </div>
              <div className="bg-white rounded p-3 mt-2">
                <pre className="text-sm text-slate-800 overflow-x-auto">
                  {`{
  "success": true
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
  "error": "Missing openingId"
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
              /api/user/visits
            </code>
          </div>

          <p className="text-slate-700 mb-6">
            Retrieves a paginated list of the authenticated user&apos;s opening
            visits, ordered by most recent first.
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
              {`// Fetch visit history with pagination
const response = await fetch('/api/user/visits?page=1&limit=15');
const data = await response.json();

console.log(data.visits);    // Array of visit objects with opening details
console.log(data.total);     // Total number of unique visited openings
console.log(data.page);      // Current page number
console.log(data.totalPages); // Total number of pages`}
            </pre>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Success Response
          </h3>
          <div className="bg-slate-50 rounded-lg p-4">
            <pre className="text-sm text-slate-800 overflow-x-auto">
              {`{
  "visits": [
    {
      "id": "string",
      "userId": "string",
      "openingId": "string",
      "count": 5,
      "visitedAt": "2024-01-15T10:30:00.000Z",
      "opening": {
        "id": "string",
        "name": "Ruy Lopez",
        "eco": "C60",
        "fen": "string",
        "pgn": "string",
        "totalVisits": 300,
        "totalFavorites": 25,
        "totalPracticeSessions": 150,
        "aliases": [
          {
            "id": "string",
            "name": "Spanish Opening",
            "openingId": "string"
          }
        ]
      }
    }
  ],
  "total": 45,
  "page": 1,
  "totalPages": 3
}`}
            </pre>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Business Logic
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Visit Recording (POST)
              </h3>
              <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
                <li>
                  <strong>Deduplication:</strong> Uses composite unique key to
                  prevent duplicates
                </li>
                <li>
                  <strong>Visit Counting:</strong> Increments count for existing
                  visits
                </li>
                <li>
                  <strong>Timestamp Updates:</strong> Updates visitedAt to most
                  recent access
                </li>
                <li>
                  <strong>Global Statistics:</strong> Increments opening&apos;s
                  totalVisits counter
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Visit Retrieval (GET)
              </h3>
              <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
                <li>
                  <strong>Pagination:</strong> Efficient handling of large visit
                  histories
                </li>
                <li>
                  <strong>Chronological Order:</strong> Most recent visits first
                </li>
                <li>
                  <strong>Comprehensive Data:</strong> Includes complete opening
                  details
                </li>
                <li>
                  <strong>Visit Metrics:</strong> Shows frequency of visits to
                  each opening
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
