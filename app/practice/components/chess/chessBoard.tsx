import React, { useCallback, useMemo } from "react";
import { Chessboard, ChessboardProps } from "react-chessboard";
import { usePracticeStore } from "../../stores/usePracticeStore";
import BoardControls from "./BoardControls";

const ChessBoard: React.FC = () => {
  const {
    currentPosition,
    makeMove,
    userPlaysAs,
    showSuggestions,
    topSuggestedMoves,
  } = usePracticeStore();

  // 🔹 Maneja el movimiento de piezas
  const onPieceDrop: ChessboardProps["onPieceDrop"] = useCallback(
    (sourceSquare, targetSquare) => {
      const move = sourceSquare + targetSquare;
      return makeMove(move);
    },
    [makeMove]
  );

  // 🔹 Orientación del tablero
  const boardOrientation = useMemo<"white" | "black">(() => {
    if (userPlaysAs === "both") return "white";
    return userPlaysAs;
  }, [userPlaysAs]);

  // 🔹 Detectar modo oscuro del sistema
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // 🔹 Estilos del tablero (modo claro/oscuro)
  const boardStyles = useMemo(
    () => ({
      borderRadius: "12px",
      boxShadow: prefersDark
        ? "0 4px 12px rgba(0, 0, 0, 0.5)"
        : "0 4px 12px rgba(0, 0, 0, 0.15)",
      transition: "all 0.3s ease",
    }),
    [prefersDark]
  );

  const lightSquareStyle = useMemo(
    () => ({
      backgroundColor: prefersDark ? "#b3b3b3" : "#f0d9b5",
      transition: "background 0.3s ease",
    }),
    [prefersDark]
  );

  const darkSquareStyle = useMemo(
    () => ({
      backgroundColor: prefersDark ? "#3c3c3c" : "#b58863",
      transition: "background 0.3s ease",
    }),
    [prefersDark]
  );

  // 🔹 Flechas y casillas sugeridas
  const suggestionArrows = useMemo(() => {
    if (!showSuggestions || !topSuggestedMoves.length) return [];
    return topSuggestedMoves.map((s) => {
      const from = s.move.slice(0, 2);
      const to = s.move.slice(2, 4);
      return [from, to];
    });
  }, [showSuggestions, topSuggestedMoves]);

  const suggestionSquares = useMemo(() => {
    if (!showSuggestions || !topSuggestedMoves.length) return {};
    const squares: Record<string, React.CSSProperties> = {};
    topSuggestedMoves.forEach((s) => {
      const target = s.move.slice(2, 4);
      squares[target] = {
        background:
          "radial-gradient(circle, rgba(255, 215, 0, 0.4) 40%, transparent 40%)",
      };
    });
    return squares;
  }, [showSuggestions, topSuggestedMoves]);

  // 🔹 Determinar turno
  const turnLabel = useMemo(() => {
    return currentPosition.includes(" w ") ? "Blancas" : "Negras";
  }, [currentPosition]);

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Indicador de turno */}
      <div className="w-full text-center">
        <div
          className={`inline-flex items-center px-4 py-2 rounded-full ${
            prefersDark
              ? "bg-blue-900 text-blue-200"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          <span className="font-semibold">Turno: {turnLabel}</span>
        </div>
      </div>

      {/* Tablero de ajedrez */}
      <div className="w-full max-w-2xl">
        <Chessboard
          id="practice-board"
          position={currentPosition}
          onPieceDrop={onPieceDrop}
          boardOrientation={boardOrientation}
          customBoardStyle={boardStyles}
          customLightSquareStyle={lightSquareStyle}
          customDarkSquareStyle={darkSquareStyle}
          customArrows={suggestionArrows}
          customSquareStyles={suggestionSquares}
          animationDuration={200}
          arePiecesDraggable={true}
          options={{
            movable: { free: true },
            animation: { enabled: true },
            coordinates: true,
          }}
        />
      </div>

      {/* Controles */}
      <BoardControls />

      {/* Indicador de modo libre */}
      {!showSuggestions && (
        <div className="text-yellow-600 font-medium">
          🎯 Modo Libre - Sin sugerencias
        </div>
      )}
    </div>
  );
};

export default ChessBoard;
