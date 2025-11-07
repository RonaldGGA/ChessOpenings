// app/dashboard/components/practiceSessions.tsx
import Link from "next/link";
import { BarChart3, Calendar, Clock } from "lucide-react";
import { FaChessBoard } from "react-icons/fa";
import { PracticeSession } from "../../../types";
import { formatDate } from "../../../lib/actions";

interface PracticeSessionsProps {
  sessions: PracticeSession[];
}

export function PracticeSessions({ sessions }: PracticeSessionsProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 mb-8">
      <h2 className="text-xl font-bold text-yellow-400 mb-4 flex items-center">
        <BarChart3 className="h-5 w-5 mr-2" />
        Recent Practice Sessions
      </h2>
      <div className="space-y-4 max-h-[700px] overflow-y-auto">
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <div
              key={session.id}
              className="p-4 bg-slate-700/30 rounded-xl border border-slate-600 hover:border-yellow-500/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  {session.opening ? (
                    <Link
                      href={`/practice/${session.opening.id}`}
                      className="flex items-center space-x-3"
                    >
                      <div className="bg-yellow-500 text-slate-900 px-2 py-1 rounded-lg text-xs font-bold">
                        {session.opening.eco}
                      </div>
                      <h3 className="text-white font-semibold">
                        {session.opening.name}
                      </h3>
                    </Link>
                  ) : (
                    <h3 className="text-white font-semibold">
                      Free Practice Session
                    </h3>
                  )}
                </div>
                <div className="text-gray-400 text-sm flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(session.createdAt.toString())}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <FaChessBoard className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-300">
                    {session.movesCount} moves
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-green-400" />
                  <span className="text-gray-300">
                    {formatDate(session.createdAt.toString())}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <FaChessBoard className="h-12 w-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No practice sessions yet.</p>
            <p className="text-gray-500 text-sm mt-1">
              Start practicing to see your sessions here.
            </p>
            <Link
              href="/free-practice"
              className="inline-block mt-4 px-6 py-3 bg-yellow-500 text-slate-900 font-semibold rounded-xl hover:bg-yellow-400 transition-colors"
            >
              Start Practicing
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}