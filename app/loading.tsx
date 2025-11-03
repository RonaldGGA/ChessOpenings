export default function Loading() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col items-center justify-center p-4">
      {/* Simple Chess Piece Spinner */}
      <div className="w-16 h-16 bg-yellow-400 rounded-xl flex items-center justify-center mb-4 animate-spin">
        <span className="text-xl text-slate-900 font-bold">♔</span>
      </div>

      {/* Simple Loading Text */}
      <div className="text-center">
        <h2 className="text-lg font-semibold text-white mb-2">
          Loading...
        </h2>
      </div>
    </div>
  );
}