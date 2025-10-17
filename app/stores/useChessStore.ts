// stores/useChessStore.ts - VERSIÓN CORREGIDA
import { create } from 'zustand';
import { Chess } from 'chess.js';

export interface PracticeStats {
  correctMoves: number;
  totalMoves: number;
  currentStreak: number;
  bestStreak: number;
  bestScore: number; // ✅ Agregado
}

export interface MoveRecommendation {
  san: string;
  wins: number;
  total: number;
  accuracy: number;
  evaluation?: number;
}

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
}

interface ChessState {
  // Estado del juego
  game: Chess;
  currentFEN: string;
  moveHistory: string[];
  
  // Estado de práctica
  currentOpening: Opening | null;
  recommendedMoves: MoveRecommendation[];
  userMoveHistory: string[];
  isCorrect: boolean | null;
  practiceStats: PracticeStats;
  
  // Actions
  initializePractice: (openingData: Opening) => void;
  makeMove: (move: string) => boolean;
  getRecommendations: (fen: string) => MoveRecommendation[];
  resetPractice: () => void;
  undoMove: () => void;
  getPracticeAccuracy: () => number;
  
  // API Actions
  fetchOpening: (id: string) => Promise<Opening | null>;
  fetchOpenings: (filters?: any) => Promise<{ openings: Opening[]; pagination: any }>;
  updateProgress: (openingId: string, stats: PracticeStats) => Promise<void>;
}

export const useChessStore = create<ChessState>((set, get) => ({
  // Estado inicial
  game: new Chess(),
  currentFEN: 'start',
  moveHistory: [],
  currentOpening: null,
  recommendedMoves: [],
  userMoveHistory: [],
  isCorrect: null,
  practiceStats: {
    correctMoves: 0,
    totalMoves: 0,
    currentStreak: 0,
    bestStreak: 0,
    bestScore: 0, // ✅ Inicializado
  },

  // Actions
  initializePractice: (openingData: Opening) => {
    const game = new Chess();
    set({
      game,
      currentFEN: game.fen(),
      currentOpening: openingData,
      moveHistory: [],
      userMoveHistory: [],
      recommendedMoves: get().getRecommendations(game.fen()),
      practiceStats: {
        correctMoves: 0,
        totalMoves: 0,
        currentStreak: 0,
        bestStreak: 0,
        bestScore: 0, // ✅ Inicializado
      },
      isCorrect: null,
    });
  },

  makeMove: (move: string) => {
    const { game, currentOpening, practiceStats } = get();
    
    try {
      const result = game.move(move);
      if (!result) return false;

      const newFEN = game.fen();
      const recommendations = get().getRecommendations(newFEN);
      const isMoveCorrect = recommendations.some(rec => rec.san === move);

      // ✅ CÁLCULO CORRECTO DE bestScore
      const currentCorrectMoves = practiceStats.correctMoves + (isMoveCorrect ? 1 : 0);
      const newBestScore = Math.max(practiceStats.bestScore, currentCorrectMoves);

      // Actualizar estadísticas
      const newStats: PracticeStats = {
        correctMoves: currentCorrectMoves,
        totalMoves: practiceStats.totalMoves + 1,
        currentStreak: isMoveCorrect ? practiceStats.currentStreak + 1 : 0,
        bestStreak: Math.max(
          practiceStats.bestStreak,
          isMoveCorrect ? practiceStats.currentStreak + 1 : 0
        ),
        bestScore: newBestScore, // ✅ Usando el nuevo cálculo
      };

      set({
        game: new Chess(newFEN),
        currentFEN: newFEN,
        moveHistory: [...get().moveHistory, move],
        userMoveHistory: [...get().userMoveHistory, move],
        recommendedMoves: recommendations,
        isCorrect: isMoveCorrect,
        practiceStats: newStats,
      });

      return true;
    } catch (error) {
      console.error('Movimiento inválido:', error);
      return false;
    }
  },

  getRecommendations: (fen: string): MoveRecommendation[] => {
    const { currentOpening, game } = get();
    if (!currentOpening) return [];

    const possibleMoves = game.moves();
    
    return possibleMoves.slice(0, 3).map((move, index) => ({
      san: move,
      wins: Math.floor(Math.random() * 100) + 50,
      total: 100,
      accuracy: 75 + index * 5,
    }));
  },

  resetPractice: () => {
    const { currentOpening } = get();
    if (currentOpening) {
      get().initializePractice(currentOpening);
    }
  },

  undoMove: () => {
    const { game, moveHistory } = get();
    if (moveHistory.length === 0) return;

    game.undo();
    const newMoveHistory = moveHistory.slice(0, -1);
    const newFEN = game.fen();

    set({
      game: new Chess(newFEN),
      currentFEN: newFEN,
      moveHistory: newMoveHistory,
      recommendedMoves: get().getRecommendations(newFEN),
      isCorrect: null,
    });
  },

  getPracticeAccuracy: () => {
    const { practiceStats } = get();
    if (practiceStats.totalMoves === 0) return 0;
    return Math.round((practiceStats.correctMoves / practiceStats.totalMoves) * 100);
  },

  // API Actions
  fetchOpening: async (id: string): Promise<Opening | null> => {
    try {
      const response = await fetch(`/api/openings/${id}`);
      if (!response.ok) throw new Error('Failed to fetch opening');
      return await response.json();
    } catch (error) {
      console.error('Error fetching opening:', error);
      return null;
    }
  },

  fetchOpenings: async (filters = {}): Promise<{ openings: Opening[]; pagination: any }> => {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, String(value));
      });
      
      const response = await fetch(`/api/openings?${params}`);
      if (!response.ok) throw new Error('Failed to fetch openings');
      return await response.json();
    } catch (error) {
      console.error('Error fetching openings:', error);
      return { openings: [], pagination: {} };
    }
  },

  updateProgress: async (openingId: string, stats: PracticeStats): Promise<void> => {
    try {
      const response = await fetch('/api/practice/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          openingId,
          correctMoves: stats.correctMoves,
          totalMoves: stats.totalMoves,
          bestScore: stats.bestScore // ✅ Ahora bestScore existe en stats
        })
      });

      if (!response.ok) throw new Error('Failed to update progress');
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  }
}));