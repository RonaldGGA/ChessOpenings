// app/dashboard/components/dashboardContent.tsx
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
    <div className="min-h-screen  text-white">
      {/* Main Content Landmark */}
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FaChessKing
              className="h-12 w-12 text-yellow-400 mr-3"
              aria-hidden="true"
            />
            <h1 className="text-4xl font-bold bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Chess Training Dashboard
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Welcome back, <span className="text-yellow-400">{user.name}</span>!
            Here&apos;s your chess practice overview.
          </p>
        </header>

        {/* User Statistics */}
        <section aria-labelledby="user-stats-heading" className="mb-8">
          <h2 id="user-stats-heading" className="sr-only">
            Your Chess Statistics
          </h2>
          <UserStats user={user} />
        </section>

        {/* Stats Grid */}
        <section aria-labelledby="stats-grid-heading" className="mb-8">
          <h2 id="stats-grid-heading" className="sr-only">
            Practice Statistics
          </h2>
          <StatsGrid stats={stats} />
        </section>

        {/* Openings Overview */}
        <section aria-labelledby="openings-overview-heading" className="mb-8">
          <h2 id="openings-overview-heading" className="sr-only">
            Chess Openings Overview
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Most Visited Openings */}
            <section
              aria-labelledby="most-visited-heading"
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700"
            >
              <h3
                id="most-visited-heading"
                className="text-xl font-bold text-yellow-400 mb-4 flex items-center"
              >
                <TrendingUp className="h-5 w-5 mr-2" aria-hidden="true" />
                Most Visited Openings
              </h3>
              <OpeningsList
                openings={mostVisitedOpenings}
                title="Most Visited Openings"
                icon={TrendingUp}
                metricKey="visitCount"
              />
            </section>

            {/* Favorite Openings */}
            <section
              aria-labelledby="favorite-openings-heading"
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700"
            >
              <h3
                id="favorite-openings-heading"
                className="text-xl font-bold text-yellow-400 mb-4 flex items-center"
              >
                <Star className="h-5 w-5 mr-2" aria-hidden="true" />
                Favorite Openings
              </h3>
              <OpeningsList
                openings={favoriteOpenings}
                title="Favorite Openings"
                icon={Star}
              />
            </section>
          </div>
        </section>

        {/* Practice Sessions */}
        <section aria-labelledby="practice-sessions-heading" className="mb-8">
          <h2
            id="practice-sessions-heading"
            className="text-2xl font-bold text-white mb-6"
          >
            Recent Practice Sessions
          </h2>
          <PracticeSessions sessions={recentPracticeSessions} />
        </section>

        {/* Most Practiced Openings */}
        <section aria-labelledby="practiced-openings-heading">
          <h2
            id="practiced-openings-heading"
            className="text-2xl font-bold text-white mb-6"
          >
            Most Practiced Openings
          </h2>
          <PracticedOpeningsGrid openings={mostPracticedOpenings} />
        </section>
      </main>
    </div>
  );
}
