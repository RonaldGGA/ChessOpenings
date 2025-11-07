"use client";

import { useEffect, useState, useCallback } from "react";
import { Chessboard, ChessboardOptions } from "react-chessboard";
import { Maximize2, RotateCw, Settings2, X, Save } from "lucide-react";
import { useSearchParams } from "next/navigation";

import RelatedOpeningsPanel from "./components/relatedOpeningsPanel";
import MoveHistory from "./components/moveHistory";
import AnalysisPanel from "./components/analysisPanel";
import SettingsModal from "./components/settingsModal";
import { useChessGame } from "../../stores/useChessStore";
import { useChessLogic } from "../../hooks/useChessLogic";
import { usePracticeSession } from "../../hooks/usePracticeSession";
import { signIn, useSession } from "next-auth/react";

const FreePracticePage = () => {
  const searchParams = useSearchParams();
  const openingFen = searchParams.get("openingFen");
  const session = useSession();

  const {
    relatedOpenings,
    chessPosition,
    optionSquares,
    movesHistory,
    isAnalyzing,
    isFullscreen,
    bestMove,
    bestEnemyMove,
    gameOver,
    isCpuThinking,
    settings,
    moveAnalysis,

    setIsFullscreen,
    onSquareClick,
    onPieceDrop,
    setBestMove,
    setBestEnemyMove,
    loadOpeningPosition,
    resetBoard,
  } = useChessGame();

  useChessLogic();

  const { savePracticeSession } = usePracticeSession();
  const [openSettings, setOpenSettings] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (openingFen) {
      try {
        console.log("Loading opening from URL:", openingFen);
        loadOpeningPosition(openingFen);
      } catch (error) {
        console.error("Failed to load opening from URL:", error);
      }
    } else {
      loadOpeningPosition(
        "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
      );
    }
  }, [openingFen, loadOpeningPosition]);

  const handleReset = useCallback(() => {
    if (openingFen) {
      loadOpeningPosition(openingFen);
    } else {
      resetBoard();
    }
  }, [openingFen, loadOpeningPosition, resetBoard]);

  const handleSaveSession = async () => {
    if (movesHistory.length === 0) {
      alert("No moves to save! Make some moves first.");
      return;
    }
    if (!session.data?.user) {
      signIn(undefined, { callbackUrl: "/free-practice" });
      return;
    }

    setIsSaving(true);
    try {
      await savePracticeSession();
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    setBestMove(moveAnalysis?.bestMove || "");
    setBestEnemyMove(moveAnalysis?.ponder || "");
  }, [moveAnalysis, setBestMove, setBestEnemyMove]);

  const getFullscreenBoardSize = () => {
    const maxWidth = window.innerWidth * 0.9;
    const maxHeight = window.innerHeight * 0.8;
    return Math.min(maxWidth, maxHeight, 800);
  };

  const showLeftPanel = settings.showRelatedOpenings;
  const showRightPanel = settings.showAnalysis;

  let boardCols = "lg:col-span-6";
  let leftPanelCols = "lg:col-span-3";
  let rightPanelCols = "lg:col-span-3";

  if (showLeftPanel && !showRightPanel) {
    boardCols = "lg:col-span-9";
    leftPanelCols = "lg:col-span-3";
  } else if (!showLeftPanel && showRightPanel) {
    boardCols = "lg:col-span-9";
    rightPanelCols = "lg:col-span-3";
  } else if (!showLeftPanel && !showRightPanel) {
    boardCols = "lg:col-span-12";
  }

  const arrows = [];
  if (
    settings.showBestMoveArrow &&
    bestMove &&
    !isCpuThinking &&
    !isAnalyzing &&
    movesHistory.length !== 0
  ) {
    arrows.push({
      startSquare: bestMove.substring(0, 2),
      endSquare: bestMove.substring(2, 4),
      color: "rgb(0, 128, 0)",
    });
  }
  if (
    settings.showPonderArrow &&
    bestEnemyMove &&
    !isCpuThinking &&
    !isAnalyzing &&
    movesHistory.length !== 0
  ) {
    arrows.push({
      startSquare: bestEnemyMove.substring(0, 2),
      endSquare: bestEnemyMove.substring(2, 4),
      color: "rgb(128, 0, 0)",
    });
  }

  const chessboardOptions: ChessboardOptions = {
    arrows: arrows.length > 0 ? arrows : undefined,
    onPieceDrop,
    onSquareClick: (args) =>
      onSquareClick({ square: args.square, piece: args.piece }),
    position: chessPosition,
    squareStyles: optionSquares,
    id: "free-practice-chessboard",
    boardOrientation: settings.boardOrientation,
  };

  if (chessPosition === "start") {
    return (
      <div className="min-h-screen  text-white flex items-center justify-center">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto mb-4"
            aria-hidden="true"
          ></div>
          <p className="text-gray-400 text-lg">Loading chess board...</p>
        </div>
      </div>
    );
  }

  if (isFullscreen) {
    return (
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-label="Full screen chess board"
        aria-modal="true"
      >
        <button
          onClick={() => setIsFullscreen(false)}
          className="absolute top-6 right-6 z-50 cursor-pointer hover:bg-gray-600 text-white p-2 rounded-full shadow-lg transition-colors border-2 border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black"
          aria-label="Exit full screen mode"
        >
          <X className="h-6 w-6" aria-hidden="true" />
        </button>

        <div className="flex items-center justify-center w-full h-full">
          <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-600 shadow-2xl">
            <Chessboard
              options={{
                ...chessboardOptions,
                boardStyle: { width: getFullscreenBoardSize() },
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-white">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
            Free Practice Board
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Practice chess openings freely with real-time analysis and related
            opening suggestions
          </p>
          {openingFen && (
            <div className="mt-4 px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg inline-block">
              <p className="text-yellow-400 text-sm">
                Practicing from loaded opening position
              </p>
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Related Openings - Left Panel */}
          {showLeftPanel && (
            <section
              className={`${leftPanelCols} order-2 lg:order-1`}
              aria-labelledby="related-openings-heading"
            >
              <h2 id="related-openings-heading" className="sr-only">
                Related Chess Openings
              </h2>
              <RelatedOpeningsPanel relatedOpenings={relatedOpenings} />
            </section>
          )}

          {/* Chess Board - Center */}
          <section
            className={`${boardCols} order-1 lg:order-2`}
            aria-labelledby="chess-board-heading"
          >
            <h2 id="chess-board-heading" className="sr-only">
              Chess Practice Board
            </h2>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
              {/* Controls */}
              <div className="flex mb-6 gap-4 justify-between items-center">
                <div className="flex gap-4 max-h-10">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-yellow-500 text-slate-900 font-semibold rounded-xl hover:bg-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-yellow-500/25 border-2 border-yellow-500 hover:border-yellow-400 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                    aria-label={
                      openingFen
                        ? "Reload opening position"
                        : "Reset chess board to starting position"
                    }
                  >
                    <RotateCw className="h-4 w-4" aria-hidden="true" />
                    <span className="hidden md:block">
                      {openingFen ? "Reload Opening" : "Reset"}
                    </span>
                  </button>
                  <button
                    onClick={handleSaveSession}
                    disabled={isSaving || movesHistory.length === 0}
                    className="px-4 py-2 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/25 border-2 border-green-600 hover:border-green-500 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                    aria-label={
                      isSaving
                        ? "Saving practice session"
                        : "Save current practice session"
                    }
                    aria-disabled={isSaving || movesHistory.length === 0}
                  >
                    <Save className="h-4 w-4" aria-hidden="true" />
                    <span className="hidden md:block">
                      {isSaving ? "Saving..." : "Save Session"}
                    </span>
                  </button>
                  <button
                    onClick={() => setIsFullscreen(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                    aria-label="Enter full screen mode for chess board"
                  >
                    <Maximize2 className="h-4 w-4" aria-hidden="true" />
                    <span className="hidden md:block">Full Screen</span>
                  </button>
                </div>
                <div className="flex gap-4 max-h-10">
                  <button
                    onClick={() => setOpenSettings(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors border border-slate-600 hover:border-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                    aria-label="Open settings menu"
                  >
                    <Settings2 className="h-4 w-4" aria-hidden="true" />
                    <span className="hidden md:block">Settings</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-2xl border border-slate-700 max-w-[500px] mx-auto shadow-lg shadow-black/30">
                {/* Game Over Banner */}
                {gameOver.isOver && (
                  <div
                    className="bg-linear-to-r from-yellow-500 to-orange-500 text-slate-900 text-center py-4 rounded-t-2xl"
                    role="alert"
                    aria-live="assertive"
                    aria-label={`Game over: ${gameOver.result}`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-xl font-bold">
                        {gameOver.result}
                      </span>
                    </div>
                  </div>
                )}

                {/* Tablero */}
                <div className="flex justify-center md:p-4">
                  <div
                    role="img"
                    aria-label="Chess board with current position"
                    aria-describedby="chessboard-description"
                  >
                    <Chessboard options={chessboardOptions} />
                  </div>
                </div>
                <div id="chessboard-description" className="sr-only">
                  Interactive chess board for practice. Current position:{" "}
                  {chessPosition}.
                  {gameOver.isOver
                    ? ` Game over: ${gameOver.result}.`
                    : " Game in progress."}
                  {movesHistory.length > 0
                    ? ` ${movesHistory.length} moves played.`
                    : " No moves played yet."}
                </div>
              </div>

              {/* Move History */}
              {settings.showMoveHistory && (
                <section
                  className="mt-6"
                  aria-labelledby="move-history-heading"
                >
                  <h3 id="move-history-heading" className="sr-only">
                    Move History
                  </h3>
                  <MoveHistory
                    movesHistory={movesHistory}
                    isOpeningFen={openingFen}
                  />
                </section>
              )}
            </div>
          </section>

          {/* Move Analysis - Right Panel */}
          {showRightPanel && (
            <section
              className={`${rightPanelCols} order-3`}
              aria-labelledby="analysis-panel-heading"
            >
              <h2 id="analysis-panel-heading" className="sr-only">
                Chess Position Analysis
              </h2>
              <AnalysisPanel
                moveAnalysis={moveAnalysis}
                isAnalyzing={isAnalyzing}
                currentFen={chessPosition}
                analysisDepth={settings.analysisDepth || 13}
              />
            </section>
          )}
        </div>
      </main>

      {/* Settings Modal */}
      <SettingsModal
        setOpenSettings={setOpenSettings}
        openSettings={openSettings}
      />
    </div>
  );
};

export default FreePracticePage;
