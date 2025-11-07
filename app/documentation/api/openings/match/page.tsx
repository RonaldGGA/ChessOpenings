import Link from "next/link";
import { ArrowLeft, XCircle, GitMerge } from "lucide-react";

export default function OpeningMatchApiPage() {
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
            Opening Match API
          </h1>
          <p className="text-xl text-slate-600">
            Real-time chess opening identification and transition analysis based
            on move sequences.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mr-4">
              GET
            </div>
            <code className="bg-slate-100 px-3 py-1 rounded text-sm font-mono">
              /api/openings/match
            </code>
          </div>

          <p className="text-slate-700 mb-6">
            Identifies chess openings and transitions that match the provided
            move sequence.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Query Parameters
          </h3>
          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b border-slate-200">
                <code className="font-mono text-sm">moveHistory</code>
                <div className="text-slate-600 text-sm">
                  string (required) - JSON string array of moves
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Example Request
          </h3>
          <div className="bg-slate-900 rounded-lg p-4 mb-6">
            <pre className="text-sm text-slate-200 overflow-x-auto">
              {`// Example move sequence: 1.e4 e5 2.Nf3 Nc6 3.Bb5
const moves = ["e4", "e5", "Nf3", "Nc6", "Bb5"];
const response = await fetch(\`/api/openings/match?moveHistory=\${encodeURIComponent(JSON.stringify(moves))}\`);`}
            </pre>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Success Response
          </h3>
          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <pre className="text-sm text-slate-800 overflow-x-auto">
              {`{
  "exactMatches": true,
  "count": 3,
  "openings": [
    {
      "id": "string",
      "fen": "string",
      "eco": "C60",
      "moves": "1. e4 e5 2. Nf3 Nc6 3. Bb5",
      "name": "Ruy Lopez",
      "src": "string",
      "isEcoRoot": true,
      "aliases": [
        {
          "source": "string",
          "value": "Spanish Opening"
        }
      ]
    }
  ],
  "transitions": [
    {
      "id": "string",
      "fromFen": "string",
      "toFen": "string",
      "fromSrc": "string",
      "toSrc": "string",
      "fromOpening": {
        "id": "string",
        "fen": "string",
        "eco": "C60",
        "name": "Ruy Lopez",
        "moves": "string"
      },
      "toOpening": {
        "id": "string",
        "fen": "string",
        "eco": "C65",
        "name": "Ruy Lopez, Berlin Defense",
        "moves": "string"
      }
    }
  ],
  "searchInfo": {
    "normalizedMoves": "1. e4 e5 2. Nf3 Nc6 3. Bb5",
    "movesCount": 5,
    "moves": ["e4", "e5", "Nf3", "Nc6", "Bb5"]
  }
}`}
            </pre>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Error Responses
          </h3>
          <div className="space-y-4">
            <div className="border-l-4 border-red-500 bg-red-50 p-4">
              <div className="flex items-center mb-2">
                <XCircle className="h-5 w-5 text-red-600 mr-2" />
                <span className="font-semibold text-red-900">
                  400 Bad Request - Missing Parameter
                </span>
              </div>
              <div className="bg-white rounded p-3 mt-2">
                <pre className="text-sm text-slate-800 overflow-x-auto">
                  {`{
  "error": "El parámetro moveHistory es requerido"
}`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-red-500 bg-red-50 p-4">
              <div className="flex items-center mb-2">
                <XCircle className="h-5 w-5 text-red-600 mr-2" />
                <span className="font-semibold text-red-900">
                  400 Bad Request - Invalid Format
                </span>
              </div>
              <div className="bg-white rounded p-3 mt-2">
                <pre className="text-sm text-slate-800 overflow-x-auto">
                  {`{
  "error": "Formato inválido para moveHistory. Debe ser un array JSON"
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Move Format Specification
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Input Format
              </h3>
              <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
                <li>
                  <strong>Type:</strong> JSON string array
                </li>
                <li>
                  <strong>Example:</strong>{" "}
                  <code>
                    [&quot;e4&quot;, &quot;e5&quot;, &quot;Nf3&quot;,
                    &quot;Nc6&quot;, &quot;Bb5&quot;]
                  </code>
                </li>
                <li>
                  <strong>Requirements:</strong> Standard algebraic notation,
                  alternating white and black moves
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Normalized Format
              </h3>
              <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
                <li>
                  <strong>Input:</strong>{" "}
                  <code>
                    [&quot;e4&quot;, &quot;e5&quot;, &quot;Nf3&quot;,
                    &quot;Nc6&quot;, &quot;Bb5&quot;]
                  </code>
                </li>
                <li>
                  <strong>Output:</strong>{" "}
                  <code>&quot;1. e4 e5 2. Nf3 Nc6 3. Bb5&quot;</code>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Search Logic
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-3">
                <GitMerge className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="font-semibold text-slate-900">
                  Opening Matching
                </h3>
              </div>
              <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
                <li>
                  <strong>Prefix Match:</strong> Openings where move sequence
                  exactly matches from start
                </li>
                <li>
                  <strong>Containment Match:</strong> Openings that contain move
                  sequence at any point
                </li>
                <li>
                  <strong>Sorting Priority:</strong> ECO root openings first,
                  then by ECO code, then move length
                </li>
              </ul>
            </div>
            <div>
              <div className="flex items-center mb-3">
                <GitMerge className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="font-semibold text-slate-900">
                  Transition Matching
                </h3>
              </div>
              <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
                <li>
                  Move sequence matches either <code>fromSrc</code> or{" "}
                  <code>toSrc</code> fields
                </li>
                <li>Provides context for opening changes and variations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
