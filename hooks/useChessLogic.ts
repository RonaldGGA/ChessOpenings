// hooks/useChessLogic.ts
import { useCallback, useEffect } from "react";
import { useChessGame } from "../stores/useChessStore";

interface StockfishAnalysis {
  bestMove: string;
  ponder: string;
  evaluation: string;
  continuation: string;
  mate: string | null;
}

export const useChessLogic = () => {
  const {
    chessGame,
    chessPosition,
    movesHistory,
    moveAnalysis,
    isCpuThinking,
    settings,
    setMoveAnalysis,
    setRelatedOpenings,
    setGameOver,
    setChessPosition,
    setMovesHistory,
    setMoveFrom,
    setOptionSquares,
    setIsCpuThinking,
    setIsAnalyzing,
  } = useChessGame();

  const analyzePosition = useCallback(
    async (fen: string) => {
      if (isCpuThinking) return;

      setIsAnalyzing(true);
      try {

        /*External Api to get AI analysis for the current game fen*/
        const response = await fetch(
          `https://stockfish.online/api/s/v2.php?fen=${encodeURIComponent(
            fen
          )}&depth=${settings?.analysisDepth ? settings.analysisDepth : 11}`
        );

        if (!response.ok) {
          throw new Error(`Stockfish error: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error("Error analyzing the position");
        }

        const bestMoveParts = data.bestmove?.split(" ") || [];
        const newData: StockfishAnalysis = {
          bestMove: bestMoveParts[1] || "",
          ponder: bestMoveParts[3] || "",
          evaluation: data.evaluation || "0",
          continuation: data.continuation || "",
          mate: data.mate,
        };
        setMoveAnalysis(newData);
      } catch (error) {
        console.error("Error analyzing position:", error);
        setMoveAnalysis(null);
      } finally {
        setIsAnalyzing(false);
      }
    },
    [settings.analysisDepth, isCpuThinking, setMoveAnalysis, setIsAnalyzing]
  );

  const fetchRelatedOpenings = useCallback(
    async (moves: string[]) => {
      try {
        const response = await fetch(
          `/api/openings/match?moveHistory=${JSON.stringify(moves)}`
        );
        const data = await response.json();
        setRelatedOpenings(data.openings || []);
      } catch (error) {
        console.error("Error fetching related openings:", error);
        setRelatedOpenings([]);
      }
    },
    [setRelatedOpenings]
  );

  const makeCpuMove = useCallback(async () => {
    if (settings.cpuSide === "none" || chessGame.isGameOver() || isCpuThinking)
      return;

    const currentTurn = chessGame.turn();
    const isCpuTurn =
      (currentTurn === "w" && settings.cpuSide === "white") ||
      (currentTurn === "b" && settings.cpuSide === "black");

    if (isCpuTurn && moveAnalysis?.bestMove) {
      setIsCpuThinking(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const possibleMoves = chessGame.moves({ verbose: true });
        const isValidMove = possibleMoves.some(
          (move) =>
            move.from === moveAnalysis.bestMove.substring(0, 2) &&
            move.to === moveAnalysis.bestMove.substring(2, 4)
        );

        if (isValidMove) {
          chessGame.move({
            from: moveAnalysis.bestMove.substring(0, 2),
            to: moveAnalysis.bestMove.substring(2, 4),
            promotion: "q",
          });

          setChessPosition(chessGame.fen());
          setMovesHistory(chessGame.history());
          setMoveFrom("");
          setOptionSquares({});
        }
      } catch (error) {
        console.error("CPU move failed:", error);
      } finally {
        setIsCpuThinking(false);
      }
    }
  }, [
    chessGame,
    moveAnalysis,
    settings.cpuSide,
    isCpuThinking,
    setChessPosition,
    setMovesHistory,
    setMoveFrom,
    setOptionSquares,
    setIsCpuThinking,
  ]);

  const checkGameState = useCallback(() => {
    if (chessGame.isGameOver()) {
      let result = "";
      if (chessGame.isCheckmate()) {
        result =
          chessGame.turn() === "w"
            ? "Black wins by checkmate! 🏆"
            : "White wins by checkmate! 🏆";
      } else if (chessGame.isDraw()) {
        if (chessGame.isStalemate()) result = "Draw by stalemate! 🤝";
        else if (chessGame.isThreefoldRepetition())
          result = "Draw by repetition! 🔁";
        else if (chessGame.isInsufficientMaterial())
          result = "Draw by insufficient material! ⚖️";
        else result = "Draw! 🤝";
      }
      setGameOver({ isOver: true, result });
    } else {
      setGameOver({ isOver: false });
    }
  }, [chessGame, setGameOver]);

  useEffect(() => {
    makeCpuMove();
  }, [makeCpuMove]);

  useEffect(() => {
    checkGameState();
  }, [chessPosition, checkGameState]);

  useEffect(() => {
    if (
      chessPosition !== "start" &&
      !chessGame.isGameOver() &&
      !isCpuThinking
    ) {
      analyzePosition(chessPosition);
      fetchRelatedOpenings(movesHistory);
    }
  }, [
    chessPosition,
    movesHistory,
    isCpuThinking,
    chessGame,
    analyzePosition,
    fetchRelatedOpenings,
  ]);

  return {
    analyzePosition,
    fetchRelatedOpenings,
    makeCpuMove,
    checkGameState,
  };
};
