// app/dashboard/components/DashboardContent.tsx
import { Navigation } from "@/app/components/navigation";
import { DashboardData } from "@/types";
import { TrendingUp, Star } from "lucide-react";
import { FaChessKing } from "react-icons/fa";
import { UserStats } from "./userStats";
import { StatsGrid } from "./statsGrid";
import { PracticeSessions } from "./practiceSessions";
import { PracticedOpeningsGrid } from "./openingsGrid";
import { OpeningsList } from "./openingsList";

interface DashboardContentProps {
  dashboardData: DashboardData;
}

export function DashboardContent({ dashboardData }: DashboardContentProps) {
  const {
    user,
    stats,
    mostVisitedOpenings,
    favoriteOpenings,
    recentPracticeSessions,
    mostPracticedOpenings,
  } = dashboardData;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FaChessKing className="h-12 w-12 text-yellow-400 mr-3" />
            <h1 className="text-4xl font-bold bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Dashboard
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Welcome back, {user.name}! Here&apos;s your chess practice overview.
          </p>
        </div>

        <UserStats user={user} />
        <StatsGrid stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <OpeningsList
            openings={mostVisitedOpenings}
            title="Most Visited Openings"
            icon={TrendingUp}
            metricKey="visitCount"
          />
          <OpeningsList
            openings={favoriteOpenings}
            title="Favorite Openings"
            icon={Star}
          />
        </div>

        <PracticeSessions sessions={recentPracticeSessions} />
        <PracticedOpeningsGrid openings={mostPracticedOpenings} />
      </div>
    </div>
  );
}