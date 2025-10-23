import { Chess } from 'chess.js';

export type PracticeMode = 'guided' | 'free' | 'vsComputer';
export type UserColor = 'white' | 'black' | 'both';

export interface Opening {
  id: string;
  eco: string;
  name: string;
  moves: string[];
  description?: string;
  whiteWins: number;
  blackWins: number;
  draws: number;
  totalGames: number;
  popularity: number;
  initialFen?: string;
  variations: Variation[];
  moveStatistics: MoveStatistic[];
}

export interface Variation {
  id: string;
  name: string;
  moves: string[];
  openingId: string;
}

export interface MoveStatistic {
  id: string;
  move: string;
  wins: number;
  losses: number;
  draws: number;
  total: number;
  openingId: string;
}

export interface UserProgress {
  id: string;
  userId: string;
  openingId: string;
  correctMoves: number;
  totalMoves: number;
  bestScore: number;
  timesPracticed: number;
  lastPracticed: Date;
}

export interface SuggestedMove {
  move: string;
  percentage: number;
  wins: number;
  isCorrect?: boolean;
}

export interface PracticeState {
  // Estado del juego
  currentGame: Chess;
  currentPosition: string;
  moveHistory: any[];
  
  // Apertura actual
  currentOpening: Opening | null;
  currentVariations: Variation[];
  moveStatistics: MoveStatistic[];
  
  // Modo de práctica
  practiceMode: PracticeMode;
  userPlaysAs: UserColor;
  showSuggestions: boolean;
  
  // Sugerencias y análisis
  topSuggestedMoves: SuggestedMove[];
  currentEvaluation: number;
  isMoveCorrect: boolean | null;
  
  // Progreso y estadísticas
  userProgress: UserProgress | null;
  correctMoves: number;
  totalMoves: number;
  accuracyPercentage: number;
  
  // UI State
  isLoading: boolean;
  error: string | null;
}