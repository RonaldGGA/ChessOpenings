import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function PracticeSessionsApiPage() {
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
            Practice Sessions API
          </h1>
          <p className="text-xl text-slate-600">
            Save and retrieve chess practice sessions with complete move history
            and analysis data.
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
              /api/user/practice-sessions
            </code>
          </div>

          <p className="text-slate-700 mb-6">
            Saves a new practice session for the authenticated user.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Request Body
          </h3>
          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <pre className="text-sm text-slate-800 overflow-x-auto">
              {`{
  "openingId": "string (optional)",
  "moves": "string (required)",
  "finalFen": "string (required)",
  "movesCount": "number (required)"
}`}
            </pre>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Example Request
          </h3>
          <div className="bg-slate-900 rounded-lg p-4 mb-6">
            <pre className="text-sm text-slate-200 overflow-x-auto">
              {`const response = await fetch('/api/user/practice-sessions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    openingId: 'clk9x8d4q0001vq2o6q7q8r9s',
    moves: 'e4 e5 Nf3 Nc6 Bb5',
    finalFen: 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R',
    movesCount: 5
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
  "success": true,
  "practiceSession": {
    "id": "string",
    "movesCount": 5,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
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
  "error": "Missing required fields",
  "details": {
    "moves": false,
    "finalFen": true,
    "movesCount": true
  }
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
              /api/user/practice-sessions
            </code>
          </div>

          <p className="text-slate-700 mb-6">
            Retrieves a paginated list of the authenticated user&apos;s practice
            sessions.
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
              {`// Fetch practice sessions with pagination
const response = await fetch('/api/user/practice-sessions?page=1&limit=10');
const data = await response.json();

console.log(data.practiceSessions); // Array of session objects
console.log(data.total);            // Total number of sessions
console.log(data.page);             // Current page number
console.log(data.totalPages);       // Total number of pages`}
            </pre>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Success Response
          </h3>
          <div className="bg-slate-50 rounded-lg p-4">
            <pre className="text-sm text-slate-800 overflow-x-auto">
              {`{
  "practiceSessions": [
    {
      "id": "string",
      "userId": "string",
      "openingId": "string",
      "moves": "string",
      "finalFen": "string",
      "movesCount": 15,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "opening": {
        "id": "string",
        "name": "Ruy Lopez",
        "eco": "C60",
        "fen": "string",
        "pgn": "string",
        "totalVisits": 150,
        "totalFavorites": 25,
        "totalPracticeSessions": 75
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
            Field Specifications
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Moves Format
              </h3>
              <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
                <li>
                  <strong>Type:</strong> String
                </li>
                <li>
                  <strong>Format:</strong> Standard chess notation (e.g.,
                  &quot;e4 e5 Nf3 Nc6 Bb5&quot;)
                </li>
                <li>
                  <strong>Purpose:</strong> Records the sequence of moves played
                  during practice
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Final FEN</h3>
              <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
                <li>
                  <strong>Type:</strong> String
                </li>
                <li>
                  <strong>Format:</strong> Valid FEN position string
                </li>
                <li>
                  <strong>Purpose:</strong> Captures the final board state for
                  analysis and replay
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Moves Count</h3>
              <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
                <li>
                  <strong>Type:</strong> Integer
                </li>
                <li>
                  <strong>Purpose:</strong> Tracks the length of the practice
                  session
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
