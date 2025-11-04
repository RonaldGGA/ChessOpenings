// components/AnalysisPanel.tsx
"use client";

import { useChessGame } from "@/app/stores/useChessStore";
import { Chess } from "chess.js";

interface StockfishAnalysis {
  bestMove: string;
  ponder: string;
  evaluation: string;
  continuation: string;
  mate: string | null;
}

interface AnalysisPanelProps {
  moveAnalysis: StockfishAnalysis | null;
  isAnalyzing: boolean;
  currentFen?: string;
  analysisDepth?: number;
}

const AnalysisPanel = ({
  moveAnalysis,
  isAnalyzing,
  currentFen,
  analysisDepth = 11,
}: AnalysisPanelProps) => {
  const { movesHistory } = useChessGame();

  // Convert UCI moves to SAN notation
  const convertToSan = (
    uciMove: string,
    fen: string,
    isPonder: boolean = false,
    bestMoveUci?: string
  ): string => {
    try {
      const chess = new Chess(fen);

      if (isPonder && bestMoveUci) {
        // Para el ponder: primero aplicar la mejor jugada, luego el ponder
        const bestMove = chess.move({
          from: bestMoveUci.substring(0, 2),
          to: bestMoveUci.substring(2, 4),
          promotion: bestMoveUci.length > 4 ? bestMoveUci[4] : undefined,
        });

        if (!bestMove) {
          return uciMove; // Si la mejor jugada no es válida, retornar el UCI original
        }

        // Ahora aplicar el ponder en la nueva posición
        const ponderMove = chess.move({
          from: uciMove.substring(0, 2),
          to: uciMove.substring(2, 4),
          promotion: uciMove.length > 4 ? uciMove[4] : undefined,
        });

        return ponderMove ? ponderMove.san : uciMove;
      } else {
        // Para la mejor jugada: aplicar directamente
        const move = chess.move({
          from: uciMove.substring(0, 2),
          to: uciMove.substring(2, 4),
          promotion: uciMove.length > 4 ? uciMove[4] : undefined,
        });

        return move ? move.san : uciMove;
      }
    } catch {
      return uciMove;
    }
  };
  // Convert UCI sequence to SAN sequence
  const convertUCISequenceToSAN = (
    uciSequence: string,
    startFen: string
  ): string => {
    try {
      const chess = new Chess(startFen);
      const moves = uciSequence.split(" ");
      const sanMoves = [];

      for (const uciMove of moves) {
        const move = chess.move({
          from: uciMove.substring(0, 2),
          to: uciMove.substring(2, 4),
          promotion: uciMove.length > 4 ? uciMove[4] : undefined,
        });
        if (move) {
          sanMoves.push(move.san);
        } else {
          // If move is invalid, return the original UCI sequence
          return uciSequence;
        }
      }

      return sanMoves.join(" ");
    } catch {
      return uciSequence;
    }
  };

  // Parse evaluation to numeric value
  const parseEvaluation = (
    evalStr: string,
    mateStr: string | null
  ): { value: number; type: "cp" | "mate" } => {
    if (mateStr) {
      const mateNum = parseInt(mateStr);
      return { value: mateNum, type: "mate" };
    }

    const numValue = parseFloat(evalStr);
    return { value: Math.round(numValue * 100), type: "cp" };
  };

  // Calculate evaluation bar percentage - SIMPLIFIED and more intuitive
  const getEvaluationPercentage = (evaluation: {
    value: number;
    type: "cp" | "mate";
  }): number => {
    if (evaluation.type === "mate") {
      return evaluation.value > 0 ? 100 : 0;
    }

    // Simple linear scaling with limits
    // eslint-disable-next-line prefer-const
    let percentage = 50 + evaluation.value / 10; // 100cp = 10% advantage

    // Cap between 0-100
    return Math.max(0, Math.min(100, percentage));
  };

  // Format evaluation for display
  const formatEvaluation = (evaluation: {
    value: number;
    type: "cp" | "mate";
  }): string => {
    if (evaluation.type === "mate") {
      const moves = Math.abs(evaluation.value);
      return `Mate in ${moves}`;
    }

    const displayValue = (evaluation.value / 100).toFixed(2);
    return evaluation.value > 0 ? `+${displayValue}` : displayValue;
  };

  // Get advantage text
  const getAdvantageText = (evaluation: {
    value: number;
    type: "cp" | "mate";
  }): string => {
    if (evaluation.type === "mate") {
      return evaluation.value > 0 ? "White is winning" : "Black is winning";
    }

    const advantage = Math.abs(evaluation.value / 100);

    if (advantage < 0.5) return "Equal position";
    if (advantage < 1.0) return "Slight advantage";
    if (advantage < 2.0) return "Moderate advantage";
    if (advantage < 4.0) return "Decisive advantage";
    return "Winning advantage";
  };

  const evaluation = moveAnalysis
    ? parseEvaluation(moveAnalysis.evaluation, moveAnalysis.mate)
    : null;
  const evaluationPercentage = evaluation
    ? getEvaluationPercentage(evaluation)
    : 50;
  const advantageText = evaluation
    ? getAdvantageText(evaluation)
    : "No evaluation";

  if (movesHistory.length === 0) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 h-full">
        <div className="flex justify-between flex-col mb-4">
          <h2 className="text-xl font-bold text-yellow-400">
            Position Analysis
          </h2>
          <div className="text-center py-8">
            <p className="text-gray-400">No analysis available</p>
            <p className="text-gray-500 text-sm mt-1">
              Make a move to see analysis
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-yellow-400">Position Analysis</h2>
        {isAnalyzing && (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-400"></div>
            <span className="text-sm text-gray-400">Analyzing</span>
          </div>
        )}
      </div>

      {/* Analysis Depth Info */}
      <div className="bg-slate-700/30 rounded-xl p-3 mb-4 border border-slate-600">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Analysis Depth:</span>
          <span className="text-yellow-400 font-mono">
            Depth {analysisDepth}
          </span>
        </div>
      </div>

      {/* Evaluation Bar - SIMPLIFIED and more intuitive */}
      {evaluation && (
        <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600 mb-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-white">Advantage</span>
            <span
              className={`text-sm font-mono ${
                evaluation.value > 50
                  ? "text-green-400"
                  : evaluation.value < -50
                  ? "text-red-400"
                  : "text-yellow-400"
              }`}
            >
              {formatEvaluation(evaluation)}
            </span>
          </div>

          {/* Advantage Text */}
          <div className="text-center mb-3">
            <span
              className={`text-sm font-medium ${
                evaluation.value > 50
                  ? "text-green-400"
                  : evaluation.value < -50
                  ? "text-red-400"
                  : "text-yellow-400"
              }`}
            >
              {advantageText}
            </span>
          </div>

          {/* Simple Visual Bar */}
          <div className="relative h-4 bg-linear-to-r from-red-500 via-yellow-500 to-green-500 rounded-full overflow-hidden">
            {/* Center indicator */}
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/50 transform -translate-x-1/2"></div>

            {/* Evaluation indicator */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white border-2 border-slate-800 rounded-full transform -translate-x-1/2 shadow-lg"
              style={{ left: `${evaluationPercentage}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>Black</span>
            <span>Equal</span>
            <span>White</span>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {isAnalyzing ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto mb-3"></div>
            <p className="text-gray-400">Analyzing position...</p>
            <p className="text-gray-500 text-sm mt-1">Depth {analysisDepth}</p>
          </div>
        ) : moveAnalysis ? (
          <>
            {/* Best Move */}
            <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600">
              <h4 className="font-semibold text-yellow-400 text-sm mb-2">
                Best Move
              </h4>
              <p className="text-white font-mono text-lg">
                {currentFen
                  ? convertToSan(moveAnalysis.bestMove, currentFen)
                  : moveAnalysis.bestMove}
              </p>
            </div>

            {/* Continuation */}
            {moveAnalysis.continuation && (
              <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600">
                <h4 className="font-semibold text-yellow-400 text-sm mb-2">
                  Suggested Line
                </h4>
                <div className="text-white text-sm font-mono">
                  {currentFen
                    ? convertUCISequenceToSAN(
                        moveAnalysis.continuation,
                        currentFen
                      )
                    : moveAnalysis.continuation}
                </div>
              </div>
            )}

            {/* Ponder */}
            {moveAnalysis.ponder && (
              <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600">
                <h4 className="font-semibold text-yellow-400 text-sm mb-2">
                  Expected Response
                </h4>
                <p className="text-white font-mono text-sm">
                  {currentFen
                    ? convertToSan(
                        moveAnalysis.ponder,
                        currentFen,
                        true,
                        moveAnalysis.bestMove
                      )
                    : moveAnalysis.ponder}
                </p>
              </div>
            )}

            {/* Game State */}
            {moveAnalysis.mate && (
              <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600">
                <h4 className="font-semibold text-yellow-400 text-sm mb-2">
                  Game State
                </h4>
                <p
                  className={`text-white font-mono text-lg ${
                    parseInt(moveAnalysis.mate) > 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {parseInt(moveAnalysis.mate) > 0
                    ? `White wins in ${moveAnalysis.mate} moves`
                    : `Black wins in ${Math.abs(
                        parseInt(moveAnalysis.mate)
                      )} moves`}
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">No analysis available</p>
            <p className="text-gray-500 text-sm mt-1">
              Make a move to see analysis
            </p>
          </div>
        )}
      </div>

      {/* Analysis Info Footer */}
      {moveAnalysis && (
        <div className="mt-4 pt-4 border-t border-slate-600">
          <div className="text-xs text-gray-500 text-center">
            Analysis provided by Stockfish at depth {analysisDepth}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisPanel;
