"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Chessboard, ChessboardOptions } from "react-chessboard";
import { Maximize2, RotateCw, Settings2, X, Save } from "lucide-react";
import { useSearchParams } from "next/navigation";

import Navigation from "./components/navigation";
import RelatedOpeningsPanel from "./components/relatedOpeningsPanel";
import MoveHistory from "./components/moveHistory";
import AnalysisPanel from "./components/analysisPanel";
import SettingsModal from "./components/settingsModal";
import { useChessGame } from "../stores/useChessStore";
import { useChessLogic } from "../hooks/useChessLogic";
import { usePracticeSession } from "../hooks/usePracticeSession";

const FreePracticePage = () => {
  const searchParams = useSearchParams();
  const openingFen = searchParams.get('openingFen');

  // Estado global del juego
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
    
    // Acciones
    setIsFullscreen,
    onSquareClick,
    onPieceDrop,
    setBestMove,
    setBestEnemyMove,
    loadOpeningPosition,
    resetBoard
  } = useChessGame();

  // Lógica del juego
  useChessLogic();

  // Gestión de sesiones simplificada
  const { savePracticeSession } = usePracticeSession();
  const [openSettings, setOpenSettings] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Efecto para cargar la apertura desde la URL - SOLO UNA VEZ
  useEffect(() => {
    if (openingFen) {
      try {
        console.log('Loading opening from URL:', openingFen);
        loadOpeningPosition(openingFen);
      } catch (error) {
        console.error('Failed to load opening from URL:', error);
      }
    }
      else{
        loadOpeningPosition("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
      }
    }, [openingFen, loadOpeningPosition]);

  // Reset handler que considera las aperturas cargadas
  const handleReset = useCallback(() => {
    if (openingFen) {
      // Si hay una apertura en la URL, recargar esa posición
      loadOpeningPosition(openingFen);
    } else {
      // Si no hay apertura, reset normal
      resetBoard();
    }
  }, [openingFen, loadOpeningPosition, resetBoard]);

  // Handler para guardar sesión
  const handleSaveSession = async () => {
    if (movesHistory.length === 0) {
      alert('No moves to save! Make some moves first.');
      return;
    }

    setIsSaving(true);
    try {
      await savePracticeSession();
    } finally {
      setIsSaving(false);
    }
  };

  // Actualizar mejores movimientos desde el análisis
  useEffect(() => {
    setBestMove(moveAnalysis?.bestMove || "");
    setBestEnemyMove(moveAnalysis?.ponder || "");
  }, [moveAnalysis, setBestMove, setBestEnemyMove]);

  // Tamaño del tablero en pantalla completa
  const getFullscreenBoardSize = () => {
    const maxWidth = window.innerWidth * 0.9;
    const maxHeight = window.innerHeight * 0.8;
    return Math.min(maxWidth, maxHeight, 800);
  };

  // Determinar columnas del grid basado en paneles visibles
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

  // Configurar flechas
  const arrows = [];
  if (
    settings.showBestMoveArrow &&
    bestMove &&
    !isCpuThinking &&
    !isAnalyzing
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
    !isAnalyzing
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
    onSquareClick: (args) => onSquareClick({square:args.square, piece:args.piece}),
    position: chessPosition,
    squareStyles: optionSquares,
    id: "free-practice-chessboard",
    boardOrientation: settings.boardOrientation,
  };

  if (chessPosition === "start") {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Loading chess board...</p>
        </div>
      </div>
    );
  }

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <button
          onClick={() => setIsFullscreen(false)}
          className="absolute top-6 right-6 z-50 cursor-pointer hover:bg-gray-600 text-white p-2 rounded-full shadow-lg transition-colors border-2 border-white/20"
        >
          <X className="h-6 w-6" />
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
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Navigation mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Related Openings - Left Panel */}
          {showLeftPanel && (
            <div className={`${leftPanelCols} order-2 lg:order-1`}>
              <RelatedOpeningsPanel relatedOpenings={relatedOpenings} />
            </div>
          )}

          {/* Chess Board - Center */}
          <div className={`${boardCols} order-1 lg:order-2`}>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
              {/* Controls */}
              <div className="flex mb-6 gap-4 justify-between items-center">
                <div className="flex gap-4 max-h-10">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-yellow-500 text-slate-900 font-semibold rounded-xl hover:bg-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-yellow-500/25 border-2 border-yellow-500 hover:border-yellow-400 flex items-center gap-2"
                  >
                    <RotateCw className="h-4 w-4" />
                    <span className="hidden md:block">
                      {openingFen ? 'Reload Opening' : 'Reset'}
                    </span>
                  </button>
                  <button
                    onClick={handleSaveSession}
                    disabled={isSaving || movesHistory.length === 0}
                    className="px-4 py-2 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/25 border-2 border-green-600 hover:border-green-500 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="h-4 w-4" />
                    <span className="hidden md:block">
                      {isSaving ? 'Saving...' : 'Save Session'}
                    </span>
                  </button>
                  <button
                    onClick={() => setIsFullscreen(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-semibold rounded-lg transition-colors"
                  >
                    <Maximize2 className="h-4 w-4" />
                    <span className="hidden md:block">Full Screen</span>
                  </button>
                </div>
                <div className="flex gap-4 max-h-10">
                  {/* CPU Thinking Indicator */}
                  {isCpuThinking ? (
                    <div className="flex items-center space-x-2 px-3 py-2 bg-purple-500/20 text-purple-300 rounded-lg border border-purple-500/30">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-400"></div>
                      <span className="text-sm">CPU...</span>
                    </div>
                  ) : isAnalyzing ? (
                    <div className="flex items-center space-x-2 px-3 py-2 bg-purple-500/20 text-purple-300 rounded-lg border border-purple-500/30">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-400"></div>
                    </div>
                  ) : settings.cpuSide !== "none" ? (
                    <div className="flex items-center space-x-2 px-3 py-2 bg-green-500/20 text-green-300 rounded-lg border border-green-500/30">
                      <span className="text-sm">Your turn</span>
                    </div>
                  ) : null}
                  <button
                    onClick={() => setOpenSettings(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors border border-slate-600 hover:border-slate-500"
                  >
                    <Settings2 className="h-4 w-4" />
                    <span className="hidden md:block">Settings</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-2xl border border-slate-700 max-w-[500px] mx-auto shadow-lg shadow-black/30">
                {/* Game Over Banner */}
                {gameOver.isOver && (
                  <div className="bg-linear-to-r from-yellow-500 to-orange-500 text-slate-900 text-center py-4 rounded-t-2xl">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-xl font-bold">
                        {gameOver.result}
                      </span>
                    </div>
                  </div>
                )}

                {/* Tablero */}
                <div className="flex justify-center md:p-4">
                  <Chessboard options={chessboardOptions} />
                </div>
              </div>

              {/* Move History */}
   
              {settings.showMoveHistory && (
                <div className="mt-6">
                  <MoveHistory movesHistory={movesHistory} isOpeningFen={openingFen} />
                </div>
              )}
            </div>
          </div>

          {/* Move Analysis - Right Panel */}
          {showRightPanel && (
            <div className={`${rightPanelCols} order-3`}>
              <AnalysisPanel
                moveAnalysis={moveAnalysis}
                isAnalyzing={isAnalyzing}
                currentFen={chessPosition}
                analysisDepth={settings.analysisDepth || 13}
              />
            </div>
          )}
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal setOpenSettings={setOpenSettings} openSettings={openSettings}/>
    </div>
  );
};

export default FreePracticePage;