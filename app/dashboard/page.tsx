import React from "react";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import {
  Star,
  Eye,
  Clock,
  TrendingUp,
  BarChart3,
  Calendar,
  Target,
  Zap,
} from "lucide-react";
import { FaChessKing, FaChessBoard } from "react-icons/fa";
import UserButton from "../components/userButton";
import Link from "next/link";
import { FcStatistics } from "react-icons/fc";
import { auth } from "@/auth";

interface Opening {
  id: string;
  fen: string;
  name: string;
  eco: string;
  moves: string;
  src: string;
  scid?: string | null;
  isEcoRoot?: boolean | null;
  totalVisits: number;
  totalFavorites: number;
  totalPracticeSessions: number;
  visitCount?: number;
  practiceCount?: number;
  favoritedAt?: string;
}

interface PracticeSession {
  id: string;
  moves: string;
  finalFen: string;
  movesCount: number;
  createdAt: Date;
  opening?: Opening | null;
}

interface DashboardData {
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    createdAt: Date;
    preferredDepth: number;
    showBestMoveArrow: boolean;
    showPonderArrow: boolean;
    defaultBoardOrientation: string;
  };
  stats: {
    totalFavorites: number;
    totalVisits: number;
    totalPracticeSessions: number;
  };
  mostVisitedOpenings: Opening[];
  favoriteOpenings: Opening[];
  recentPracticeSessions: PracticeSession[];
  mostPracticedOpenings: Opening[];
}

async function getDashboardData(userId: string): Promise<DashboardData> {
  // Ejecutar todas las consultas en paralelo para máxima eficiencia
  const [
    user,
    statsData,
    favoriteOpeningsData,
    openingVisits,
    practiceSessions,
    practicedOpenings,
  ] = await Promise.all([
    // Datos del usuario con preferencias
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
        preferredDepth: true,
        showBestMoveArrow: true,
        showPonderArrow: true,
        defaultBoardOrientation: true,
      },
    }),

    // Estadísticas agregadas en una sola consulta
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        _count: {
          select: {
            favorites: true,
            visits: true,
            practiceSessions: true,
          },
        },
      },
    }),

    // Aperturas favoritas con datos de estadísticas del opening
    prisma.userFavorite.findMany({
      where: { userId },
      include: {
        opening: {
          select: {
            id: true,
            fen: true,
            name: true,
            eco: true,
            moves: true,
            src: true,
            scid: true,
            isEcoRoot: true,
            totalVisits: true,
            totalFavorites: true,
            totalPracticeSessions: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),

    // Aperturas más visitadas con conteo de visitas del usuario
    prisma.openingVisit.findMany({
      where: { userId },
      include: {
        opening: {
          select: {
            id: true,
            fen: true,
            name: true,
            eco: true,
            moves: true,
            src: true,
            scid: true,
            isEcoRoot: true,
            totalVisits: true,
            totalFavorites: true,
            totalPracticeSessions: true,
          },
        },
      },
      orderBy: { count: "desc" },
      take: 5,
    }),

    // Sesiones de práctica recientes
    prisma.practiceSession.findMany({
      where: { userId },
      include: {
        opening: {
          select: {
            id: true,
            fen: true,
            name: true,
            eco: true,
            moves: true,
            src: true,
            scid: true,
            isEcoRoot: true,
            totalVisits: true,
            totalFavorites: true,
            totalPracticeSessions: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),

    // Aperturas más practicadas
    prisma.practiceSession.groupBy({
      by: ["openingId"],
      where: { 
        userId,
        openingId: { not: null }
      },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 5,
    }),
  ]);

  if (!user || !statsData) {
    throw new Error("User not found");
  }

  // Obtener detalles de aperturas practicadas
  const practicedOpeningIds = practicedOpenings.map(session => session.openingId!);
  const practicedOpeningsData = practicedOpeningIds.length > 0 
    ? await prisma.opening.findMany({
        where: { id: { in: practicedOpeningIds } },
        select: {
          id: true,
          fen: true,
          name: true,
          eco: true,
          moves: true,
          src: true,
          scid: true,
          isEcoRoot: true,
          totalVisits: true,
          totalFavorites: true,
          totalPracticeSessions: true,
        },
      })
    : [];

  // Mapear conteos de práctica a las aperturas
  const mostPracticedOpenings = practicedOpeningsData.map(opening => {
    const practiceData = practicedOpenings.find(session => session.openingId === opening.id);
    return {
      ...opening,
      practiceCount: practiceData?._count.id || 0,
    };
  });

  return {
    user,
    stats: {
      totalFavorites: statsData._count.favorites,
      totalVisits: statsData._count.visits,
      totalPracticeSessions: statsData._count.practiceSessions,
    },
    mostVisitedOpenings: openingVisits.map(visit => ({
      ...visit.opening,
      visitCount: visit.count,
    })),
    favoriteOpenings: favoriteOpeningsData.map(fav => fav.opening),
    recentPracticeSessions: practiceSessions,
    mostPracticedOpenings,
  };
}

// Componente para mostrar las estadísticas del usuario
function UserStats({ user }: { user: DashboardData['user'] }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 mb-6">
      <h2 className="text-xl font-bold text-yellow-400 mb-4">Your Preferences</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <Target className="h-4 w-4 text-blue-400" />
          <span className="text-gray-300">Analysis Depth: {user.preferredDepth}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="h-4 w-4 text-green-400" />
          <span className="text-gray-300">
            Best Move: {user.showBestMoveArrow ? 'On' : 'Off'}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Eye className="h-4 w-4 text-purple-400" />
          <span className="text-gray-300">
            Ponder: {user.showPonderArrow ? 'On' : 'Off'}
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

function StatsGrid({ stats }: { stats: DashboardData['stats'] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Favorites */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-yellow-500/50 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Favorites</p>
            <p className="text-3xl font-bold text-white mt-2">{stats.totalFavorites}</p>
          </div>
          <div className="p-3 bg-yellow-500/20 rounded-xl">
            <Star className="h-6 w-6 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Opening Views */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-yellow-500/50 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Opening Views</p>
            <p className="text-3xl font-bold text-white mt-2">{stats.totalVisits}</p>
          </div>
          <div className="p-3 bg-blue-500/20 rounded-xl">
            <Eye className="h-6 w-6 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Practice Sessions */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-yellow-500/50 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Practice Sessions</p>
            <p className="text-3xl font-bold text-white mt-2">{stats.totalPracticeSessions}</p>
          </div>
          <div className="p-3 bg-green-500/20 rounded-xl">
            <Clock className="h-6 w-6 text-green-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

function OpeningsList({ 
  openings, 
  title, 
  icon: Icon, 
  metricIcon,
  metricKey 
}: { 
  openings: Opening[];
  title: string;
  icon: React.ElementType;
  metricIcon?: React.ElementType;
  metricKey?: 'visitCount' | 'practiceCount';
}) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
      <h2 className="text-xl font-bold text-yellow-400 mb-4 flex items-center">
        <Icon className="h-5 w-5 mr-2" />
        {title}
      </h2>
      <div className="space-y-3">
        {openings.length > 0 ? (
          openings.map((opening) => (
            <Link
              key={opening.id}
              href={`/practice/${opening.id}`}
              className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600 hover:border-yellow-500/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3 flex-1">
                <div className="bg-yellow-500 text-slate-900 px-2 py-1 rounded-lg text-xs font-bold min-w-12 text-center">
                  {opening.eco}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold truncate">{opening.name}</h3>
                  <p className="text-gray-400 text-sm truncate">{opening.moves}</p>
                </div>
              </div>
              {metricIcon && metricKey && opening[metricKey] && (
                <div className="flex items-center space-x-1 text-yellow-400">
                  <FcStatistics className="h-4 w-4" />
                  <span className="text-sm">{opening[metricKey]}</span>
                </div>
              )}
              {!metricIcon && (
                <div className="text-red-400">
                  <Star className="h-4 w-4 fill-current" />
                </div>
              )}
            </Link>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon className="h-12 w-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No {title.toLowerCase()} yet.</p>
            <p className="text-gray-500 text-sm mt-1">
              {title.includes('Favorite') 
                ? 'Click the heart icon on openings to add them to favorites.'
                : 'Start exploring openings to see them here.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function PracticeSessions({ sessions }: { sessions: PracticeSession[] }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 mb-8">
      <h2 className="text-xl font-bold text-yellow-400 mb-4 flex items-center">
        <BarChart3 className="h-5 w-5 mr-2" />
        Recent Practice Sessions
      </h2>
      <div className="space-y-4">
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
                      <h3 className="text-white font-semibold">{session.opening.name}</h3>
                    </Link>
                  ) : (
                    <h3 className="text-white font-semibold">Free Practice Session</h3>
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
                  <span className="text-gray-300">{session.movesCount} moves</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-green-400" />
                  <span className="text-gray-300">{formatDate(session.createdAt.toString())}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <FaChessBoard className="h-12 w-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No practice sessions yet.</p>
            <p className="text-gray-500 text-sm mt-1">Start practicing to see your sessions here.</p>
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

function PracticedOpeningsGrid({ openings }: { openings: Opening[] }) {
  if (openings.length === 0) return null;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
      <h2 className="text-xl font-bold text-yellow-400 mb-4 flex items-center">
        <Target className="h-5 w-5 mr-2" />
        Most Practiced Openings
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {openings.map((opening) => (
          <Link
            key={opening.id}
            href={`/practice/${opening.id}`}
            className="p-4 bg-slate-700/30 rounded-xl border border-slate-600 hover:border-yellow-500/50 transition-colors cursor-pointer text-center block"
          >
            <div className="bg-yellow-500 text-slate-900 px-2 py-1 rounded-lg text-xs font-bold mb-2">
              {opening.eco}
            </div>
            <h3 className="text-white font-semibold text-sm mb-1 truncate">{opening.name}</h3>
            <p className="text-gray-400 text-xs mb-2 truncate">
              {opening.moves.split(' ').slice(0, 3).join(' ')}...
            </p>
            <div className="flex items-center justify-center space-x-1 text-yellow-400">
              <Target className="h-3 w-3" />
              <span className="text-xs">{opening.practiceCount} sessions</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Funciones de utilidad
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

// Componente principal del dashboard
function DashboardContent({ dashboardData }: { dashboardData: DashboardData }) {
  const { user, stats, mostVisitedOpenings, favoriteOpenings, recentPracticeSessions, mostPracticedOpenings } = dashboardData;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="bg-slate-800/30 border-b border-slate-700/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="h-8 w-8 bg-yellow-400 rounded-lg flex items-center justify-center group-hover:bg-yellow-300 transition-colors">
                  <span className="text-slate-900 font-bold text-lg">♔</span>
                </div>
                <div className="absolute inset-0 bg-yellow-400/20 rounded-lg group-hover:bg-yellow-400/30 transition-colors blur-sm"></div>
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                ChessMaster
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-6 relative z-50">
              <Link href="/" className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors group">
                <span>Home</span>
              </Link>
              <Link href="/explore" className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors group">
                <span>Explore</span>
              </Link>
              <Link href="/free-practice" className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors group">
                <span>Free Practice</span>
              </Link>
              <div className="h-6 w-px bg-slate-600"></div>
              <UserButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
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

        {/* User Preferences */}
        <UserStats user={user} />

        <StatsGrid stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <OpeningsList 
            openings={mostVisitedOpenings}
            title="Most Visited Openings"
            icon={TrendingUp}
            metricIcon={Eye}
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

// Componente servidor principal
export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/auth/signin?callbackUrl=/dashboard");
  }

  let dashboardData = null;
  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      redirect("/");
    }

     dashboardData = await getDashboardData(user.id);


  } catch (error) {
    console.error("Error loading dashboard:", error);
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg">Failed to load dashboard data.</p>
          <Link
            href="/"
            className="inline-block mt-4 px-6 py-3 bg-yellow-500 text-slate-900 font-semibold rounded-xl hover:bg-yellow-400 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }
    return <DashboardContent dashboardData={dashboardData} />;
}