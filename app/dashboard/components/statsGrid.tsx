// app/dashboard/components/statsGrid.tsx
import { Star, Eye, Clock } from "lucide-react";
import { DashboardData } from "../../../types";

interface StatsGridProps {
  stats: DashboardData["stats"];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-yellow-500/50 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Favorites</p>
            <p className="text-3xl font-bold text-white mt-2">
              {stats.totalFavorites}
            </p>
          </div>
          <div className="p-3 bg-yellow-500/20 rounded-xl">
            <Star className="h-6 w-6 text-yellow-400" />
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-yellow-500/50 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Opening Views</p>
            <p className="text-3xl font-bold text-white mt-2">
              {stats.totalVisits}
            </p>
          </div>
          <div className="p-3 bg-blue-500/20 rounded-xl">
            <Eye className="h-6 w-6 text-blue-400" />
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-yellow-500/50 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Practice Sessions</p>
            <p className="text-3xl font-bold text-white mt-2">
              {stats.totalPracticeSessions}
            </p>
          </div>
          <div className="p-3 bg-green-500/20 rounded-xl">
            <Clock className="h-6 w-6 text-green-400" />
          </div>
        </div>
      </div>
    </div>
  );
}