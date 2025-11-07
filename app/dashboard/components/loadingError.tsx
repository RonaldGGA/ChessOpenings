// app/dashboard/components/loadingError.tsx
import Link from "next/link";

interface LoadingErrorProps {
  type: 'loading' | 'error';
  message?: string;
}

export function LoadingError({ type, message }: LoadingErrorProps) {
  return (
    <div className="min-h-screen  text-white flex items-center justify-center">
      <div className="text-center">
        {type === 'loading' ? (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg">Loading dashboard...</p>
          </>
        ) : (
          <>
            <p className="text-gray-400 text-lg mb-4">
              {message || "Failed to load dashboard data."}
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-yellow-500 text-slate-900 font-semibold rounded-xl hover:bg-yellow-400 transition-colors"
            >
              Return Home
            </Link>
          </>
        )}
      </div>
    </div>
  );
}