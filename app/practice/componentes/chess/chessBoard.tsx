// components/chess/ChessBoard.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Chessboard } from 'react-chessboard';
import { useChessStore } from '../../../stores/useChessStore';
import { useUIStore } from '../../../stores/useUiStore';

interface PieceDropParams {
  piece: { 
    isSparePiece: boolean; 
    pieceType: string; 
    position: string;
  };
  sourceSquare: string;
  targetSquare: string | null;
}

export default function ChessBoard() {
  const { 
    currentFEN, 
    makeMove, 
    isCorrect,
    recommendedMoves,
    practiceStats 
  } = useChessStore();
  
  const { boardOrientation } = useUIStore();
  
  const [boardSize, setBoardSize] = useState(400);

  
  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      
      if (width < 640) { // móvil
        setBoardSize(300);
      } else if (width < 768) { // tablet pequeño
        setBoardSize(350);
      } else if (width < 1024) { // tablet grande
        setBoardSize(400);
      } else if (width < 1280) { // laptop
        setBoardSize(450);
      } else { // desktop grande
        setBoardSize(500); // ✅ Tamaño controlado para desktop
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  const onPieceDrop = (params: PieceDropParams): boolean => {
    const { sourceSquare, targetSquare, piece } = params;
    
    if (targetSquare === null) {
      console.warn('Target square is null - movimiento inválido');
      return false;
    }

    const moveSuccessful = makeMove(`${sourceSquare}${targetSquare}`);
    
    if (moveSuccessful) {
      console.log(`✅ Movimiento exitoso: ${sourceSquare}->${targetSquare}`);
    } else {
      console.log(`❌ Movimiento fallido: ${sourceSquare}->${targetSquare}`);
    }
    
    return moveSuccessful;
  };

  const chessboardOptions = {
    id: 'practice-chessboard',
    position: currentFEN,
    onPieceDrop: onPieceDrop,
    boardOrientation: boardOrientation,
    boardStyle: {
      borderRadius: '8px',
      boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)',
    },
    darkSquareStyle: { 
      backgroundColor: '#b58863',
    },
    lightSquareStyle: { 
      backgroundColor: '#f0d9b5',
    },
    boardWidth: boardSize,
    areArrowsAllowed: true,
    arePremovesAllowed: false,
    showBoardNotation: true,
    animationDuration: 300,
    draggable: true,
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
      {/* Indicador de movimiento - posición mejorada */}
      {isCorrect !== null && (
        <div 
          className={`mb-4 px-4 py-2 rounded-full text-white font-semibold text-sm transition-all duration-300 ${
            isCorrect 
              ? 'bg-green-500 shadow-lg' 
              : 'bg-red-500 shadow-lg'
          }`}
        >
          {isCorrect ? '✓ Movimiento Correcto' : '✗ Movimiento Incorrecto'}
          {isCorrect && practiceStats.currentStreak > 1 && (
            <span className="ml-2 text-yellow-300">
              (+{practiceStats.currentStreak})
            </span>
          )}
        </div>
      )}
      
      {/* ✅ Contenedor principal que previene desbordamiento */}
       <div className="flex justify-center items-center">
        <div style={{ width: `${boardSize}px`, height: `${boardSize}px` }}>
          <Chessboard options={chessboardOptions} />
        </div>
      </div>
      
      {/* Información adicional */}
      <div className="mt-4 text-center">
        <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 bg-gray-100 px-4 py-2 rounded-lg text-sm">
          <span className="text-gray-700">
            <strong>{recommendedMoves.length}</strong> movimientos recomendados
          </span>
          <span className="hidden sm:inline text-gray-400">•</span>
          <span className="text-gray-700">
            Precisión: <strong>{practiceStats.correctMoves}/{practiceStats.totalMoves}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}