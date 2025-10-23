// components/chess/MoveList.tsx

import { MoveRecommendation, useChessStore } from "../../../stores/useChessStore";


interface MoveListProps {
  maxMoves?: number;
}

export default function MoveList({ maxMoves = 5 }: MoveListProps) {
  const { recommendedMoves, makeMove } = useChessStore();

  const handleMoveClick = (move: MoveRecommendation) => {
    makeMove(move.san);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <h3 className="font-semibold text-lg mb-3">Movimientos Recomendados</h3>
      
      {recommendedMoves.length === 0 ? (
        <p className="text-gray-500 text-sm">No hay movimientos recomendados</p>
      ) : (
        <div className="space-y-2">
          {recommendedMoves.slice(0, maxMoves).map((move, index) => (
            <button
              key={`${move.san}-${index}`}
              onClick={() => handleMoveClick(move)}
              className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="font-mono font-medium">{move.san}</span>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    move.accuracy >= 80 ? 'bg-green-100 text-green-800' :
                    move.accuracy >= 60 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {move.accuracy}%
                  </span>
                  <span className="text-xs text-gray-500">
                    {move.wins}/{move.total}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}