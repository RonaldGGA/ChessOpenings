// components/MoveHistory.tsx
"use client";

import { History } from "lucide-react";

interface MoveHistoryProps {
  movesHistory: string[];
  isOpeningFen: string | null;
}

const MoveHistory = ({ movesHistory, isOpeningFen }: MoveHistoryProps) => {
  // Agrupar movimientos por turno
  const groupedMoves = [];
  for (let i = 0; i < movesHistory.length; i += 2) {
    const moveNumber = Math.floor(i / 2) + 1;
    const whiteMove = movesHistory[i];
    const blackMove = movesHistory[i + 1];
    groupedMoves.push({ moveNumber, whiteMove, blackMove });
  }

  return (
    <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50">
      {/* Header Simple */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
          <History className="h-4 w-4 text-yellow-400" />
        </div>
        <div>
          <h3 className="text-white font-semibold flex items-center gap-2">
            Move History
            {movesHistory.length > 0 && (
              <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-full">
                {movesHistory.length} moves
              </span>
            )}
          </h3>
          {isOpeningFen && (
            <p className="text-yellow-400 text-xs mt-1">
              Starting from opening position
            </p>
          )}
        </div>
      </div>

      {/* Moves Content - Compacto y legible */}
      <div className="min-h-[60px] max-h-[200px] overflow-y-auto">
        {movesHistory.length > 0 ? (
          <div className="space-y-2">
            {groupedMoves.map(({ moveNumber, whiteMove, blackMove }) => (
              <div key={moveNumber} className="flex items-center gap-2 text-sm">
                {/* Número del movimiento */}
                <div className="w-8 shrink-0 text-right">
                  <span className="text-gray-400 font-medium">
                    {moveNumber}.
                  </span>
                </div>
                
                {/* Movimiento blanco */}
                <div className="px-3 py-2 bg-blue-500/20 text-blue-100 rounded-lg border border-blue-500/30 flex-1">
                  <span className="font-mono">{whiteMove}</span>
                </div>
                
                {/* Movimiento negro */}
                {blackMove && (
                  <div className="px-3 py-2 bg-slate-600/50 text-gray-100 rounded-lg border border-slate-500/50 flex-1">
                    <span className="font-mono">{blackMove}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-400 text-sm">
              {isOpeningFen 
                ? "Start playing from the opening position!" 
                : "Make your first move to begin!"}
            </p>
          </div>
        )}
      </div>

      {/* Simple counter footer */}
      {movesHistory.length > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-700/30">
          <div className="flex justify-between text-xs text-gray-400">
            <span>White: {movesHistory.filter((_, i) => i % 2 === 0).length}</span>
            <span>Black: {movesHistory.filter((_, i) => i % 2 === 1).length}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoveHistory;