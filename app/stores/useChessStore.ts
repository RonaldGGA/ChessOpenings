// stores/useChessStore.ts
import { create } from 'zustand'
import { Chess, Square } from 'chess.js'

interface PracticeStats {
  correctMoves: number
  totalMoves: number
  currentStreak: number
  bestStreak: number
  accuracy: number
}

interface MoveRecommendation {
  san: string
  accuracy: number
  wins: number
  total: number
}

interface GameStatus {
  isCheck: boolean
  isCheckmate: boolean
  isStalemate: boolean
  isDraw: boolean
  isGameOver: boolean
  result?: '1-0' | '0-1' | '1/2-1/2'
}

interface ChessState {
  // Estado del juego
  game: Chess
  currentFEN: string
  isCorrect: boolean | null
  recommendedMoves: MoveRecommendation[]
  gameStatus: GameStatus
  moveHistory: string[]
  
  // Estadísticas de práctica
  practiceStats: PracticeStats
  
  // Apertura actual
  currentOpening: any | null
  
  // Actions
  initializePractice: (opening: any) => void
  makeMove: (move: string) => boolean
  resetPractice: () => void
  getGameStatus: () => GameStatus
  getValidMoves: (square: string) => string[]
}

export const useChessStore = create<ChessState>((set, get) => ({
  game: new Chess(),
  currentFEN: 'start',
  isCorrect: null,
  recommendedMoves: [],
  gameStatus: {
    isCheck: false,
    isCheckmate: false,
    isStalemate: false,
    isDraw: false,
    isGameOver: false
  },
  moveHistory: [],
  practiceStats: {
    correctMoves: 0,
    totalMoves: 0,
    currentStreak: 0,
    bestStreak: 0,
    accuracy: 0
  },
  currentOpening: null,

  initializePractice: (opening) => {
    const game = new Chess()
    const initialFEN = opening.initialFen || 'start'
    
    if (initialFEN !== 'start') {
      try {
        game.load(initialFEN)
      } catch (error) {
        console.error('Error loading FEN:', error)
      }
    }

    set({ 
      game,
      currentFEN: game.fen(),
      currentOpening: opening,
      isCorrect: null,
      gameStatus: get().getGameStatus(),
      moveHistory: [],
      practiceStats: {
        correctMoves: 0,
        totalMoves: 0,
        currentStreak: 0,
        bestStreak: 0,
        accuracy: 0
      }
    })
  },

  makeMove: (move: string): boolean => {
    const { game, practiceStats } = get()
    
    try {
      // Intentar hacer el movimiento
      const result = game.move(move)
      
      if (result) {
        const isCorrectMove = true // Aquí integrarías la validación contra la apertura
        
        // Actualizar estadísticas
        const newStats = {
          ...practiceStats,
          totalMoves: practiceStats.totalMoves + 1,
          correctMoves: practiceStats.correctMoves + (isCorrectMove ? 1 : 0),
          currentStreak: isCorrectMove ? practiceStats.currentStreak + 1 : 0,
          bestStreak: isCorrectMove 
            ? Math.max(practiceStats.bestStreak, practiceStats.currentStreak + 1)
            : practiceStats.bestStreak,
          accuracy: practiceStats.totalMoves > 0 
            ? Math.round((practiceStats.correctMoves + (isCorrectMove ? 1 : 0)) / (practiceStats.totalMoves + 1) * 100)
            : (isCorrectMove ? 100 : 0)
        }

        // Obtener nuevo estado del juego
        const gameStatus = get().getGameStatus()
        const moveHistory = [...get().moveHistory, result.san]

        set({
          game: new Chess(game.fen()), // Nueva instancia para reactividad
          currentFEN: game.fen(),
          isCorrect: isCorrectMove,
          practiceStats: newStats,
          gameStatus,
          moveHistory
        })

        return true
      }
    } catch (error) {
      console.error('Movimiento inválido:', error)
    }
    
    return false
  },

  resetPractice: () => {
    const { currentOpening } = get()
    get().initializePractice(currentOpening)
  },

  getGameStatus: () => {
    const { game } = get()
    return {
      isCheck: game.isCheck(),
      isCheckmate: game.isCheckmate(),
      isStalemate: game.isStalemate(),
      isDraw: game.isDraw(),
      isGameOver: game.isGameOver(),
      result: game.isCheckmate() 
        ? (game.turn() === 'w' ? '0-1' : '1-0')
        : game.isDraw() ? '1/2-1/2' : undefined
    }
  },

  getValidMoves: (square: Square) => {
    const { game } = get()
    try {
      return game.moves({ square, verbose: true }).map(move => move.to)
    } catch (error) {
      return []
    }
  }
}))