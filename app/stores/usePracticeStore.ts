import { create } from 'zustand';
import { Chess } from 'chess.js';
import { PracticeState, PracticeMode, UserColor, SuggestedMove } from '../types/practice';
import { OpeningService } from '../services/openingService';
import { AnalysisService } from '../services/analysisService';

const openingService = new OpeningService();
const analysisService = AnalysisService.getInstance();

interface PracticeActions {
  // Inicialización
  loadOpening: (openingId: string) => Promise<void>;
  initializePractice: (mode: PracticeMode) => void;
  
  // Movimientos
  makeMove: (move: string) => boolean;
  undoMove: () => void;
  makeComputerMove: () => void;
  
  // Modo de práctica
  setPracticeMode: (mode: PracticeMode) => void;
  setUserColor: (color: UserColor) => void;
  toggleSuggestions: () => void;
  
  // Análisis
  analyzePosition: (fen: string) => void;
  updateEvaluation: (evaluation: number) => void;
  
  // Progreso
  updateUserProgress: () => void;
  calculateAccuracy: (move: string) => boolean;
  
  // Utilidades
  resetPractice: () => void;
  getCurrentMoveSequence: () => string[];

  updateSuggestions: () => Promise<void>;
}

export const usePracticeStore = create<PracticeState & PracticeActions>((set, get) => ({
  // Estado inicial
  currentGame: new Chess(),
  currentPosition: 'start',
  moveHistory: [],
  currentOpening: null,
  currentVariations: [],
  moveStatistics: [],
  practiceMode: 'guided',
  userPlaysAs: 'white',
  showSuggestions: true,
  topSuggestedMoves: [],
  currentEvaluation: 0,
  isMoveCorrect: null,
  userProgress: null,
  correctMoves: 0,
  totalMoves: 0,
  accuracyPercentage: 0,
  isLoading: false,
  error: null,

  // === ACCIONES ===

  loadOpening: async (openingId: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const [opening, variations] = await Promise.all([
        openingService.getOpeningById(openingId),
        openingService.getVariationsForOpening(openingId)
      ]);

      set({
        currentOpening: opening,
        currentVariations: variations,
        moveStatistics: opening.moveStatistics,
        isLoading: false
      });

      // Cargar progreso del usuario (en app real, obtener userId de auth)
      const userId = 'current-user-id'; // Temporal
      const userProgress = await openingService.getUserProgress(userId, openingId);
      if (userProgress) {
        set({ 
          userProgress,
          correctMoves: userProgress.correctMoves,
          totalMoves: userProgress.totalMoves,
          accuracyPercentage: (userProgress.correctMoves / userProgress.totalMoves) * 100
        });
      }

    } catch (error) {
      set({ 
        error: 'Error loading opening', 
        isLoading: false 
      });
    }
  },

  initializePractice: (mode: PracticeMode) => {
    const { currentOpening, currentGame } = get();
    
    if (!currentOpening) return;

    // Reiniciar juego y aplicar movimientos de apertura
    currentGame.reset();
    
    // Aplicar movimientos iniciales de la apertura
    currentOpening.moves.forEach(move => {
      currentGame.move(move);
    });

    set({
      currentGame,
      currentPosition: currentGame.fen(),
      moveHistory: currentGame.history({ verbose: true }),
      practiceMode: mode,
      showSuggestions: mode !== 'free'
    });

    // Actualizar sugerencias y evaluación
    get().updateSuggestions();
    get().analyzePosition(currentGame.fen());
  },

  makeMove: (move: string) => {
    const { currentGame, practiceMode, userPlaysAs } = get();
    
    try {
      const result = currentGame.move(move);
      
      if (result) {
        const isCorrect = get().calculateAccuracy(move);
        
        // Actualizar estado
        set(state => ({
          currentPosition: currentGame.fen(),
          moveHistory: currentGame.history({ verbose: true }),
          isMoveCorrect: isCorrect,
          correctMoves: isCorrect ? state.correctMoves + 1 : state.correctMoves,
          totalMoves: state.totalMoves + 1,
          accuracyPercentage: ((state.correctMoves + (isCorrect ? 1 : 0)) / (state.totalMoves + 1)) * 100
        }));

        // Actualizar progreso en base de datos
        get().updateUserProgress();

        // Si es modo vsComputer y no es turno del usuario, mover computadora
        if (practiceMode === 'vsComputer' && userPlaysAs !== 'both') {
          const currentTurn = currentGame.turn();
          const shouldComputerMove = 
            (userPlaysAs === 'white' && currentTurn === 'b') ||
            (userPlaysAs === 'black' && currentTurn === 'w');
          
          if (shouldComputerMove) {
            setTimeout(() => get().makeComputerMove(), 500);
          }
        }

        // Actualizar sugerencias y evaluación
        get().updateSuggestions();
        get().analyzePosition(currentGame.fen());

        return true;
      }
    } catch (error) {
      console.error('Movimiento inválido:', error);
    }
    
    return false;
  },

  undoMove: () => {
    const { currentGame } = get();
    const move = currentGame.undo();
    
    if (move) {
      set({
        currentPosition: currentGame.fen(),
        moveHistory: currentGame.history({ verbose: true }),
        isMoveCorrect: null
      });

      get().updateSuggestions();
      get().analyzePosition(currentGame.fen());
    }
  },

  makeComputerMove: () => {
    const { currentGame, moveStatistics } = get();
    const moves = currentGame.moves();
    
    if (moves.length === 0) return;

    // Intentar encontrar mejor movimiento de apertura
    const bestMove = analysisService.getBestMoveFromOpening(moveStatistics);
    
    if (bestMove && moves.includes(bestMove)) {
      get().makeMove(bestMove);
    } else {
      // Movimiento aleatorio si no hay en apertura
      const randomMove = moves[Math.floor(Math.random() * moves.length)];
      get().makeMove(randomMove);
    }
  },

  setPracticeMode: (mode: PracticeMode) => {
    set({ 
      practiceMode: mode,
      showSuggestions: mode !== 'free'
    });
  },

  setUserColor: (color: UserColor) => {
    set({ userPlaysAs: color });
  },

  toggleSuggestions: () => {
    set(state => ({ showSuggestions: !state.showSuggestions }));
  },

  analyzePosition: async (fen: string) => {
    const { practiceMode } = get();
    
    if (practiceMode === 'free') return;

    try {
      // Por ahora evaluación básica, luego con Stockfish
      const evaluation = await analysisService.getStockfishEvaluation(fen);
      set({ currentEvaluation: evaluation });
    } catch (error) {
      console.error('Error en análisis:', error);
    }
  },

  updateEvaluation: (evaluation: number) => {
    set({ currentEvaluation: evaluation });
  },

  updateUserProgress: async () => {
    const { currentOpening, isMoveCorrect, correctMoves, totalMoves } = get();
    
    if (!currentOpening || isMoveCorrect === null) return;

    try {
      const userId = 'current-user-id'; // En app real, de auth context
      await openingService.updateUserProgress(
        userId, 
        currentOpening.id, 
        isMoveCorrect
      );
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  },

  calculateAccuracy: (move: string): boolean => {
    const { topSuggestedMoves, practiceMode } = get();
    
    if (practiceMode === 'free') return true; // En modo libre, todo es "correcto"
    
    // Verificar si el movimiento está en los top 3 sugeridos
    return topSuggestedMoves.some(suggested => suggested.move === move);
  },

  resetPractice: () => {
    const { currentOpening } = get();
    set({
      currentGame: new Chess(),
      currentPosition: 'start',
      moveHistory: [],
      currentEvaluation: 0,
      isMoveCorrect: null,
      correctMoves: 0,
      totalMoves: 0,
      accuracyPercentage: 0
    });

    if (currentOpening) {
      get().initializePractice(get().practiceMode);
    }
  },

  getCurrentMoveSequence: (): string[] => {
    const { currentGame } = get();
    return currentGame.history();
  },

  // Actualizar sugerencias basadas en posición actual
  updateSuggestions: async () => {
    const { currentOpening, practiceMode, getCurrentMoveSequence } = get();
    
    if (!currentOpening || practiceMode === 'free') {
      set({ topSuggestedMoves: [] });
      return;
    }

    try {
      const currentSequence = getCurrentMoveSequence();
      const topMoves = await openingService.getTopMovesForPosition(
        currentOpening.id,
        currentSequence
      );

      const totalGames = topMoves.reduce((sum, move) => sum + move.total, 0);
      const suggestedMoves: SuggestedMove[] = topMoves.map(move => ({
        move: move.move,
        percentage: (move.total / totalGames) * 100,
        wins: move.wins
      }));

      set({ topSuggestedMoves: suggestedMoves });
    } catch (error) {
      console.error('Error updating suggestions:', error);
      set({ topSuggestedMoves: [] });
    }
  }
}));