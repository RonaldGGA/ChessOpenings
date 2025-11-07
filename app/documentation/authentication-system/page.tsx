import Link from "next/link";
import { ArrowLeft, Shield, Key, Database } from "lucide-react";

export default function AuthenticationSystemPage() {
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
            Authentication System
          </h1>
          <p className="text-xl text-slate-600">
            Comprehensive authentication system using NextAuth.js with multiple
            providers and custom registration flows.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Authentication Flow
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Registration Process
              </h3>
              <div className="bg-slate-50 rounded-lg p-4 mb-4">
                <code className="text-sm text-slate-800">
                  User Registration → Database Creation → Auto-Login → Dashboard
                  Redirect
                </code>
              </div>
              <ol className="text-sm text-slate-700 list-decimal list-inside space-y-2">
                <li>
                  User fills registration form (name, email, password, confirm
                  password)
                </li>
                <li>
                  Client-side validation (password match, length requirements)
                </li>
                <li>
                  API call to <code>/api/auth/register</code> with user data
                </li>
                <li>
                  Server validation and password hashing (bcrypt with 12 rounds)
                </li>
                <li>User creation in database via Prisma</li>
                <li>Automatic sign-in using credentials provider</li>
                <li>Redirect to dashboard or specified callback URL</li>
              </ol>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Sign-In Process
              </h3>
              <div className="bg-slate-50 rounded-lg p-4 mb-4">
                <code className="text-sm text-slate-800">
                  Sign-In Form → Credentials/OAuth Validation → Session Creation
                  → Redirect
                </code>
              </div>
              <div className="text-sm text-slate-700">
                <p className="font-semibold mb-2">Authentication Methods:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong>Credentials:</strong> Email/password with bcrypt
                    comparison
                  </li>
                  <li>
                    <strong>Google OAuth:</strong> OAuth 2.0 with consent prompt
                  </li>
                  <li>
                    <strong>GitHub OAuth:</strong> OAuth 2.0 with user profile
                    access
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            NextAuth Configuration
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-3">
                <Shield className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="font-semibold text-slate-900">
                  Core Configuration
                </h3>
              </div>
              <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
                <li>
                  <strong>Session Strategy:</strong> JWT (30-day expiry)
                </li>
                <li>
                  <strong>Adapter:</strong> PrismaAdapter for database
                  persistence
                </li>
                <li>
                  <strong>Pages:</strong> Custom sign-in, registration, and
                  error pages
                </li>
              </ul>
            </div>
            <div>
              <div className="flex items-center mb-3">
                <Key className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="font-semibold text-slate-900">Providers</h3>
              </div>
              <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
                <li>CredentialsProvider (email/password)</li>
                <li>GoogleProvider (with offline access)</li>
                <li>GitHubProvider (with profile access)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Security Implementation
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Password Security
              </h3>
              <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
                <li>
                  <strong>Hashing:</strong> bcrypt with 12 salt rounds
                </li>
                <li>
                  <strong>Validation:</strong> Minimum 6 characters
                </li>
                <li>
                  <strong>Storage:</strong> Hashed only, never plain text
                </li>
                <li>
                  <strong>Transmission:</strong> HTTPS required in production
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Session Management
              </h3>
              <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
                <li>
                  <strong>Strategy:</strong> JWT-based sessions
                </li>
                <li>
                  <strong>Duration:</strong> 30 days maximum
                </li>
                <li>
                  <strong>Storage:</strong> HTTP-only cookies
                </li>
                <li>
                  <strong>Renewal:</strong> Automatic on activity
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                OAuth Security
              </h3>
              <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
                <li>
                  <strong>State Validation:</strong> CSRF protection
                </li>
                <li>
                  <strong>PKCE:</strong> For OAuth 2.0 providers
                </li>
                <li>
                  <strong>Account Linking:</strong> Prevents duplicate accounts
                </li>
                <li>
                  <strong>Scope Limitation:</strong> Minimal required
                  permissions
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Data Protection
              </h3>
              <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
                <li>
                  <strong>Input Sanitization:</strong> All user inputs trimmed
                  and validated
                </li>
                <li>
                  <strong>Error Messages:</strong> Generic messages to prevent
                  information leakage
                </li>
                <li>
                  <strong>Rate Limiting:</strong> Implemented at API level
                </li>
                <li>
                  <strong>SQL Injection Prevention:</strong> Prisma ORM with
                  parameterized queries
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Database Schema
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center mb-2">
                <Database className="h-5 w-5 text-purple-600 mr-2" />
                <h3 className="font-semibold text-slate-900">User Model</h3>
              </div>
              <div className="bg-slate-900 rounded-lg p-4">
                <pre className="text-sm text-slate-200 overflow-x-auto">
                  {`model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?   // Hashed for credential users
  accounts      Account[]
  sessions      Session[]
  favorites     UserFavorite[]
  visits        OpeningVisit[]
  practiceSessions PracticeSession[]
  
  // User Preferences
  preferredDepth    Int     @default(13)
  showBestMoveArrow Boolean @default(true)
  showPonderArrow   Boolean @default(true)
  defaultBoardOrientation String @default("white")
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
