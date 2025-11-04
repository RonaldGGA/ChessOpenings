// app/dashboard/components/UserStats.tsx
import { Target, Zap, Eye } from "lucide-react";
import { FaChessBoard } from "react-icons/fa";
import { DashboardData } from "../../../types";

interface UserStatsProps {
  user: DashboardData["user"];
}

export function UserStats({ user }: UserStatsProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 mb-6">
      <h2 className="text-xl font-bold text-yellow-400 mb-4">
        Your Preferences
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <Target className="h-4 w-4 text-blue-400" />
          <span className="text-gray-300">
            Analysis Depth: {user.preferredDepth}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="h-4 w-4 text-green-400" />
          <span className="text-gray-300">
            Best Move: {user.showBestMoveArrow ? "On" : "Off"}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Eye className="h-4 w-4 text-purple-400" />
          <span className="text-gray-300">
            Ponder: {user.showPonderArrow ? "On" : "Off"}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <FaChessBoard className="h-4 w-4 text-yellow-400" />
          <span className="text-gray-300 capitalize">
            Board: {user.defaultBoardOrientation}
          </span>
        </div>
      </div>
    </div>
  );
}