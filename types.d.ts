// DASHBOARD TYPES
export interface Opening {
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

export interface PracticeSession {
  id: string;
  moves: string;
  finalFen: string;
  movesCount: number;
  createdAt: Date;
  opening?: Opening | null;
}

export interface DashboardData {
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