import { Opening } from "@/app/generated/prisma/client";
import { OpeningWithRelations } from "@/app/practice/[id]/page";
import  prisma  from "@/lib/prisma";
import { DashboardData } from "@/types";

export async function findOpening(id: string) {
  try {
    const opening = await prisma.opening.findUnique({
      where: { id },
      include: {
        aliases: true,
        toTransitions: {
          where: {
            toOpening: {
              isNot: null
            }
          },
          select: {
            id: true,
            createdAt: true,
            fromFen: true,
            toFen: true,
            fromSrc: true,
            toSrc: true,
            toOpening: {
              select: {
                id: true,
                name: true,
                fen: true,
                src: true,
                eco: true,
                moves: true,
                scid: true,
                isEcoRoot: true,
                createdAt: true,
                updatedAt: true
              }
            }
          }
        }
      },
    });

    if (!opening) {
      return { opening: null, variations: [] };
    }

    // Get variations (openings that share the same ECO and are different from current)
    const variations = await prisma.opening.findMany({
      where: {
        eco: opening.eco,
        id: { not: opening.id }
      },
      include: {
        aliases: true,
      },
      take: 10,
      orderBy: {
        name: 'asc'
      }
    });

    return {
      opening: opening as OpeningWithRelations,
      variations: variations as Opening[]
    };

  } catch (error) {
    console.error('Error fetching opening:', error);
    return { opening: null, variations: [] };
  }
}

//DASHBOARD UTILS

// app/dashboard/utils.ts
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export async function getDashboardData(userId: string): Promise<DashboardData> {
  const [
    user,
    statsData,
    favoriteOpeningsData,
    openingVisits,
    practiceSessions,
    practicedOpenings,
  ] = await Promise.all([
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

    prisma.practiceSession.groupBy({
      by: ["openingId"],
      where: {
        userId,
        openingId: { not: null },
      },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 5,
    }),
  ]);

  if (!user || !statsData) {
    throw new Error("User not found");
  }

  const practicedOpeningIds = practicedOpenings.map(
    (session) => session.openingId!
  );
  const practicedOpeningsData =
    practicedOpeningIds.length > 0
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

  const mostPracticedOpenings = practicedOpeningsData.map((opening) => {
    const practiceData = practicedOpenings.find(
      (session) => session.openingId === opening.id
    );
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
    mostVisitedOpenings: openingVisits.map((visit) => ({
      ...visit.opening,
      visitCount: visit.count,
    })),
    favoriteOpenings: favoriteOpeningsData.map((fav) => fav.opening),
    recentPracticeSessions: practiceSessions,
    mostPracticedOpenings,
  };
}