// stores/useChessGame.ts
import { create } from 'zustand';
import { Chess, Square } from 'chess.js';
import { Opening } from '@/app/generated/prisma/client';
import { PieceDropHandlerArgs, SquareHandlerArgs } from 'react-chessboard';

interface StockfishAnalysis {
  bestMove: string;
  ponder: string;
  evaluation: string;
  continuation: string;
  mate: string | null;
}

interface GameSettings {
  showBestMoveArrow: boolean;
  showPonderArrow: boolean;
  boardOrientation: "white" | "black";
  showRelatedOpenings: boolean;
  showAnalysis: boolean;
  showMoveHistory: boolean;
  cpuSide: "white" | "black" | "none";
  analysisDepth: number;
}

interface ChessGameState {
  chessGame: Chess;
  relatedOpenings: Opening[];
  moveAnalysis: StockfishAnalysis | null;
  chessPosition: string;
  moveFrom: string;
  optionSquares: Record<string, React.CSSProperties>;
  movesHistory: string[];
  isAnalyzing: boolean;
  isFullscreen: boolean;
  bestMove: string;
  bestEnemyMove: string;
  gameOver: { isOver: boolean; result?: string };
  isCpuThinking: boolean;
  settings: GameSettings;
  loadOpeningPosition: (fen: string) => void;

  


  setChessGame: (chess: Chess) => void;
  setRelatedOpenings: (openings: Opening[]) => void;
  setMoveAnalysis: (analysis: StockfishAnalysis | null) => void;
  setChessPosition: (fen: string) => void;
  setMoveFrom: (square: string) => void;
  setOptionSquares: (squares: Record<string, React.CSSProperties>) => void;
  setMovesHistory: (moves: string[]) => void;
  setIsAnalyzing: (analyzing: boolean) => void;
  setIsFullscreen: (fullscreen: boolean) => void;
  setBestMove: (move: string) => void;
  setBestEnemyMove: (move: string) => void;
  setGameOver: (gameOver: { isOver: boolean; result?: string }) => void;
  setIsCpuThinking: (thinking: boolean) => void;
  setSettings: (settings: GameSettings) => void;
  updateSettings: (settings: Partial<GameSettings>) => void;

  resetBoard: () => void;
  makeMove: (from: string, to: string, promotion?: string) => boolean;
  getMoveOptions: (square: Square) => boolean;
  onSquareClick: ({piece, square }:SquareHandlerArgs) => void;
  onPieceDrop: ({sourceSquare, targetSquare }:PieceDropHandlerArgs) => boolean;
}

export const useChessGame = create<ChessGameState>((set, get) => ({
  chessGame: new Chess(),
  relatedOpenings: [],
  moveAnalysis: null,
  chessPosition: 'start',
  moveFrom: '',
  optionSquares: {},
  movesHistory: [],
  isAnalyzing: false,
  isFullscreen: false,
  bestMove: '',
  bestEnemyMove: '',
  gameOver: { isOver: false },
  isCpuThinking: false,
  settings: {
    showBestMoveArrow: true,
    showPonderArrow: true,
    boardOrientation: "white",
    showRelatedOpenings: true,
    showAnalysis: true,
    showMoveHistory: true,
    cpuSide: 'black',
    analysisDepth: 11,
  },

  setChessGame: (chess) => set({ chessGame: chess }),
  setRelatedOpenings: (openings) => set({ relatedOpenings: openings }),
  setMoveAnalysis: (analysis) => set({ moveAnalysis: analysis }),
  setChessPosition: (fen) => set({ chessPosition: fen }),
  setMoveFrom: (square) => set({ moveFrom: square }),
  setOptionSquares: (squares) => set({ optionSquares: squares }),
  setMovesHistory: (moves) => set({ movesHistory: moves }),
  setIsAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),
  setIsFullscreen: (fullscreen) => set({ isFullscreen: fullscreen }),
  setBestMove: (move) => set({ bestMove: move }),
  setBestEnemyMove: (move) => set({ bestEnemyMove: move }),
  setGameOver: (gameOver) => set({ gameOver }),
  setIsCpuThinking: (thinking) => set({ isCpuThinking: thinking }),
  setSettings: (settings) => set({ settings }),
  updateSettings: (updates) => set((state) => ({ 
    settings: { ...state.settings, ...updates } 
  })),
  
  loadOpeningPosition: (fen) => {
    try {
      const newChess = new Chess();
      newChess.load(fen);
      
      set({
        chessGame: newChess,
        chessPosition: fen,
        movesHistory: [],  
        moveAnalysis: null,
        relatedOpenings: [],
        optionSquares: {},
        moveFrom: '',
        gameOver: { isOver: false },
        isCpuThinking: false,
      });
    } catch (error) {
      console.error('Error loading opening position:', error);
      const defaultChess = new Chess();
      set({
        chessGame: defaultChess,
        chessPosition: defaultChess.fen(),
        movesHistory: [],
      });
    }
  },

  resetBoard: () => {
    const newChess = new Chess();
    set({
      chessGame: newChess,
      chessPosition: newChess.fen(),
      movesHistory: [],
      moveAnalysis: null,
      relatedOpenings: [],
      optionSquares: {},
      moveFrom: '',
      gameOver: { isOver: false },
      isCpuThinking: false,
    });
  },

  makeMove: (from, to, promotion = 'q') => {
    const state = get();
    try {
      state.chessGame.move({ from, to, promotion });
      const newFen = state.chessGame.fen();
      const newHistory = state.chessGame.history();
      
      set({
        chessPosition: newFen,
        movesHistory: newHistory,
        moveFrom: '',
        optionSquares: {},
      });
      return true;
    } catch {
      return false;
    }
  },

  getMoveOptions: (square) => {
    const state = get();
    const moves = state.chessGame.moves({
      square,
      verbose: true,
    });

    if (moves.length === 0) {
      set({ optionSquares: {} });
      return false;
    }

    const newSquares: Record<string, React.CSSProperties> = {};

    for (const move of moves) {
      newSquares[move.to] = {
        background:
          state.chessGame.get(move.to) &&
          state.chessGame.get(move.to)?.color !== state.chessGame.get(square)?.color
            ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
    }

    newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)",
    };

    set({ optionSquares: newSquares });
    return true;
  },

  onSquareClick: ({square, piece}) => {
    const state = get();
    const { settings, isCpuThinking, moveFrom } = state;
    
    const currentTurn = state.chessGame.turn();
    const isCpuTurn =
      (currentTurn === "w" && settings.cpuSide === "white") ||
      (currentTurn === "b" && settings.cpuSide === "black");

    if (isCpuTurn || isCpuThinking) return;

    if (!moveFrom && piece) {
      const hasMoveOptions = state.getMoveOptions(square as Square);
      if (hasMoveOptions) {
        set({ moveFrom: square });
      }
      return;
    }

    const moves = state.chessGame.moves({
      square: moveFrom as Square,
      verbose: true,
    });
    const foundMove = moves.find((m) => m.from === moveFrom && m.to === square);

    if (!foundMove) {
      const hasMoveOptions = state.getMoveOptions(square as Square);
      set({ moveFrom: hasMoveOptions ? square : "" });
      return;
    }

    const moveSuccess = state.makeMove(moveFrom, square, "q");
    if (!moveSuccess) {
      const hasMoveOptions = state.getMoveOptions(square as Square);
      set({ moveFrom: hasMoveOptions ? square : "" });
    }
  },
  onPieceDrop: ({sourceSquare, targetSquare}) => {
    const state = get();
    const { settings, isCpuThinking } = state;
    
    const currentTurn = state.chessGame.turn();
    const isCpuTurn =
      (currentTurn === "w" && settings.cpuSide === "white") ||
      (currentTurn === "b" && settings.cpuSide === "black");

    if (isCpuTurn || isCpuThinking) return false;

    if (!targetSquare) {
      return false;
    }

    return state.makeMove(sourceSquare, targetSquare, "q");
  },
}));