import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  Shield,
} from "lucide-react";

export default function AuthApiPage() {
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
            Authentication API
          </h1>
          <p className="text-xl text-slate-600">
            User registration endpoint with comprehensive validation and
            security measures.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mr-4">
              POST
            </div>
            <code className="bg-slate-100 px-3 py-1 rounded text-sm font-mono">
              /api/auth/register
            </code>
          </div>

          <p className="text-slate-700 mb-6">
            Creates a new user account with the provided credentials and
            personal information.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Request Headers
          </h3>
          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center py-2 border-b border-slate-200">
              <code className="font-mono text-sm">Content-Type</code>
              <div className="text-slate-600 text-sm">
                application/json (required)
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Request Body
          </h3>
          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <pre className="text-sm text-slate-800 overflow-x-auto">
              {`{
  "name": "string (required, min: 2 characters)",
  "email": "string (required, valid email format)",
  "password": "string (required, min: 6 characters)"
}`}
            </pre>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Example Request
          </h3>
          <div className="bg-slate-900 rounded-lg p-4 mb-6">
            <pre className="text-sm text-slate-200 overflow-x-auto">
              {`const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'securepassword123'
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
                  201 Created - Success
                </span>
              </div>
              <div className="bg-white rounded p-3 mt-2">
                <pre className="text-sm text-slate-800 overflow-x-auto">
                  {`{
  "success": true,
  "message": "Account created successfully",
  "user": {
    "id": "string",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4">
              <div className="flex items-center mb-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="font-semibold text-yellow-900">
                  400 Bad Request - Validation Error
                </span>
              </div>
              <div className="bg-white rounded p-3 mt-2">
                <pre className="text-sm text-slate-800 overflow-x-auto">
                  {`{
  "error": "All fields are required"
}`}
                </pre>
                <p className="text-sm text-slate-600 mt-2">
                  Other validation errors: &quot;Invalid email format&quot;,
                  &quot;Password must be at least 6 characters long&quot;,
                  &quot;Name must be at least 2 characters long&quot;
                </p>
              </div>
            </div>

            <div className="border-l-4 border-red-500 bg-red-50 p-4">
              <div className="flex items-center mb-2">
                <XCircle className="h-5 w-5 text-red-600 mr-2" />
                <span className="font-semibold text-red-900">
                  409 Conflict - Duplicate Account
                </span>
              </div>
              <div className="bg-white rounded p-3 mt-2">
                <pre className="text-sm text-slate-800 overflow-x-auto">
                  {`{
  "error": "An account with this email already exists"
}`}
                </pre>
              </div>
            </div>

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
  "error": "Failed to create user account"
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Security Features
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <Shield className="h-5 w-5 text-blue-600 mb-2" />
              <h3 className="font-semibold text-blue-900 mb-2">
                Password Handling
              </h3>
              <ul className="text-sm text-blue-800 list-disc list-inside space-y-1">
                <li>Hashing with bcrypt (12 rounds)</li>
                <li>Only hashed version stored</li>
                <li>Plain text during registration (HTTPS required)</li>
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <Shield className="h-5 w-5 text-green-600 mb-2" />
              <h3 className="font-semibold text-green-900 mb-2">
                Data Protection
              </h3>
              <ul className="text-sm text-green-800 list-disc list-inside space-y-1">
                <li>Email normalization (lowercase)</li>
                <li>Input trimming</li>
                <li>No password in response</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Validation Rules
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Name Field</h3>
              <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
                <li>
                  <strong>Required:</strong> Yes
                </li>
                <li>
                  <strong>Minimum Length:</strong> 2 characters
                </li>
                <li>
                  <strong>Trimming:</strong> Leading/trailing whitespace removed
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Email Field</h3>
              <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
                <li>
                  <strong>Required:</strong> Yes
                </li>
                <li>
                  <strong>Format:</strong> Valid email format
                </li>
                <li>
                  <strong>Normalization:</strong> Converted to lowercase
                </li>
                <li>
                  <strong>Uniqueness:</strong> Must not exist in database
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Password Field
              </h3>
              <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
                <li>
                  <strong>Required:</strong> Yes
                </li>
                <li>
                  <strong>Minimum Length:</strong> 6 characters
                </li>
                <li>
                  <strong>Hashing:</strong> BCrypt with 12 rounds
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
