import Link from "next/link";
import { ArrowLeft, Database, User, BarChart3, Calendar } from "lucide-react";

export default function ServerActionsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Link
            href="/documentation"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Documentation
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Server Actions & Utilities
          </h1>
          <p className="text-xl text-slate-600">
            Utility functions for fetching opening data and generating dashboard
            statistics.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 mb-8">
          <div className="flex items-center mb-4">
            <Database className="h-6 w-6 text-blue-600 mr-3" />
            <h2 className="text-2xl font-semibold text-slate-900">
              findOpening(id: string)
            </h2>
          </div>

          <p className="text-slate-700 mb-6">
            Fetches a specific opening with its related data including
            transitions and variations.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Parameters
          </h3>
          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center py-2 border-b border-slate-200">
              <code className="font-mono text-sm">id</code>
              <div className="text-slate-600 text-sm">
                string - Unique identifier of the opening
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">Returns</h3>
          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <pre className="text-sm text-slate-800 overflow-x-auto">
              {`{
  opening: OpeningWithRelations | null,
  variations: Opening[]
}`}
            </pre>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Example Usage
          </h3>
          <div className="bg-slate-900 rounded-lg p-4 mb-6">
            <pre className="text-sm text-slate-200 overflow-x-auto">
              {`const { opening, variations } = await findOpening('opening-123');
if (opening) {
  console.log(\`Found: \${opening.name} with \${variations.length} variations\`);
}`}
            </pre>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Database Queries
          </h3>
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">
                Primary Opening Fetch
              </h4>
              <ul className="text-sm text-blue-800 list-disc list-inside space-y-1">
                <li>Fetches opening by ID</li>
                <li>Includes aliases and transitions</li>
                <li>
                  Filters transitions with valid <code>toOpening</code>{" "}
                  relations
                </li>
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">
                Variations Fetch
              </h4>
              <ul className="text-sm text-green-800 list-disc list-inside space-y-1">
                <li>Finds openings with same ECO code</li>
                <li>Excludes the current opening</li>
                <li>Limited to 10 results</li>
                <li>Ordered alphabetically by name</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 mb-8">
          <div className="flex items-center mb-4">
            <BarChart3 className="h-6 w-6 text-green-600 mr-3" />
            <h2 className="text-2xl font-semibold text-slate-900">
              getDashboardData(userId: string)
            </h2>
          </div>

          <p className="text-slate-700 mb-6">
            Comprehensive data fetcher for user dashboard with multiple
            statistical aggregations.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Parameters
          </h3>
          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center py-2 border-b border-slate-200">
              <code className="font-mono text-sm">userId</code>
              <div className="text-slate-600 text-sm">
                string - Unique identifier of the user
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">Returns</h3>
          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <pre className="text-sm text-slate-800 overflow-x-auto">
              {`Promise<DashboardData> {
  user: UserProfile,
  stats: {
    totalFavorites: number,
    totalVisits: number,
    totalPracticeSessions: number
  },
  mostVisitedOpenings: Array<Opening & { visitCount: number }>,
  favoriteOpenings: Opening[],
  recentPracticeSessions: PracticeSession[],
  mostPracticedOpenings: Array<Opening & { practiceCount: number }>
}`}
            </pre>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Database Queries Performed
          </h3>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 rounded-lg p-4">
              <User className="h-5 w-5 text-blue-600 mb-2" />
              <h4 className="font-semibold text-slate-900">User Profile</h4>
              <p className="text-sm text-slate-600 mt-1">
                Basic user information and preferences
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <BarChart3 className="h-5 w-5 text-green-600 mb-2" />
              <h4 className="font-semibold text-slate-900">User Statistics</h4>
              <p className="text-sm text-slate-600 mt-1">
                Counts of favorites, visits, and sessions
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <Database className="h-5 w-5 text-purple-600 mb-2" />
              <h4 className="font-semibold text-slate-900">
                Favorite Openings
              </h4>
              <p className="text-sm text-slate-600 mt-1">
                5 most recent favorite openings
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <Calendar className="h-5 w-5 text-orange-600 mb-2" />
              <h4 className="font-semibold text-slate-900">Visit History</h4>
              <p className="text-sm text-slate-600 mt-1">
                5 most visited openings
              </p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Performance Characteristics
          </h3>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start">
              <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-3 mt-0.5">
                🚀
              </div>
              <span>
                Uses <code>Promise.all()</code> for parallel database queries
              </span>
            </li>
            <li className="flex items-start">
              <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-3 mt-0.5">
                📊
              </div>
              <span>Limits results to prevent over-fetching</span>
            </li>
            <li className="flex items-start">
              <div className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mr-3 mt-0.5">
                ⚡
              </div>
              <span>Efficient aggregation queries for statistics</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <div className="flex items-center mb-4">
            <Calendar className="h-6 w-6 text-orange-600 mr-3" />
            <h2 className="text-2xl font-semibold text-slate-900">
              formatDate(dateString: string)
            </h2>
          </div>

          <p className="text-slate-700 mb-6">
            Formats date strings into a human-readable format.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">Example</h3>
          <div className="bg-slate-900 rounded-lg p-4">
            <pre className="text-sm text-slate-200 overflow-x-auto">
              {`formatDate('2024-01-15T10:30:00.000Z') 
// Returns "Jan 15, 2024"`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
