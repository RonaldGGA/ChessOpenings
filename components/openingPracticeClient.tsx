// components/openingPracticeClient.tsx
'use client';

import { useState, useMemo } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  RefreshCw,
  Swords,
  Info,
  ArrowLeft,
} from 'lucide-react';
import { Alias, FromTo, Opening } from '../app/generated/prisma/client';
import { useRouter } from 'next/navigation';


type OpeningWithRelations = Opening & {
  aliases: Alias[];
  toTransitions?: (FromTo & {
    toOpening: Opening;
  })[];
};

interface OpeningPracticeClientProps {
  opening: OpeningWithRelations;
  variations: Opening[];
}

function parseMoves(moveString: string): string[] {
  if (!moveString) return [];
  // Remove move numbers like "1." and "1..." and split by whitespace
  const moves = moveString.replace(/\d+\.(\.\.)?/g, '').trim().split(/\s+/);
  return moves.filter((m) => m && m !== '...');
}

export default function OpeningPracticeClient({
  opening,
  variations,
}: OpeningPracticeClientProps) {
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [orientation, setOrientation] = useState<'white' | 'black'>('white');
  const router = useRouter()

  const allMoves = useMemo(
    () => parseMoves(opening?.moves ?? ''),
    [opening?.moves]
  );

  const moveHistory = useMemo(() => {
    const moves = allMoves;
    const game = new Chess();
    const history: string[] = [game.fen()];

    for (const mv of moves) {
      try {
        game.move(mv);
        history.push(game.fen());
      } catch (err) {
        console.error('Invalid move in opening moves:', mv, err);
        break;
      }
    }

    return history;
  }, [allMoves]);

  const goToMove = (index: number) => {
    if (index >= 0 && index < moveHistory.length) {
      setCurrentMoveIndex(index);
    }
  };

  const nextMove = () => {
    if (currentMoveIndex < moveHistory.length - 1) {
      goToMove(currentMoveIndex + 1);
    }
  };

  const prevMove = () => {
    if (currentMoveIndex > 0) {
      goToMove(currentMoveIndex - 1);
    }
  };

  const resetOpening = () => goToMove(0);

  const toggleOrientation = () =>
    setOrientation((prev) => (prev === 'white' ? 'black' : 'white'));

  const goToFreePractice = () => {
    router.push(`/free-practice?openingFen=${encodeURIComponent(opening.fen)}`);
  };

  const currentPosition = moveHistory[currentMoveIndex] ?? moveHistory[0] ?? 'start';

  const getMoveNotation = (fenIndex: number) => {
    if (fenIndex === 0) return 'Start position';
    const moveNumber = Math.ceil(fenIndex / 2);
    const isWhite = fenIndex % 2 === 1;
    const move = allMoves[fenIndex - 1] ?? '';
    return `${moveNumber}${isWhite ? '.' : '...'} ${move}`;
  };

  const allVariations = [
    ...(opening?.toTransitions?.map((t) => t.toOpening) ?? []),
    ...(variations ?? []),
  ].filter((v: Opening, i: number, arr: Opening[]) => i === arr.findIndex((x) => x.id === v.id));

  return (
    <div
      key={opening?.id}
      className="p-4 min-h-screen  text-white"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/search-openings"
          className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </Link>

        <div className="text-center">
          <h1 className="text-3xl font-bold bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            {opening?.name ?? 'Unknown Opening'}
          </h1>
          <div className="flex items-center justify-center gap-4 mt-2 text-gray-300">
            {opening?.eco && (
              <span className="px-3 py-1 bg-yellow-500 text-slate-900 font-semibold rounded-full">
                {opening.eco}
              </span>
            )}
            {opening?.scid && (
              <span className="px-3 py-1 bg-slate-700 rounded-full text-sm">
                SCID: {opening.scid}
              </span>
            )}
          </div>
        </div>

        <Link
          href={`/practice/${opening?.id}`}
        >
          <span
          className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
          
          >
          <Info className="h-5 w-5" />
          Details 
          </span>
          <span className='text-yellow-700 text-xs'>Coming soon...</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Chessboard Section */}
        <div className="lg:col-span-3">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
            <div className="flex justify-center mb-6">
              <div className="max-w-[500px] w-full">
                <Chessboard options={{id:"board_id", position:currentPosition, boardOrientation:orientation}}
                />
              </div>
            </div>

            {/* Move Navigation */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={prevMove}
                disabled={currentMoveIndex === 0}
                className="p-3 bg-slate-700 rounded-xl hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-slate-600"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <div className="text-center min-w-[200px]">
                <p className="text-lg font-semibold text-yellow-400">
                  {getMoveNotation(currentMoveIndex)}
                </p>
                <p className="text-sm text-gray-400">
                  Move {currentMoveIndex} of {Math.max(0, moveHistory.length - 1)}
                </p>
              </div>

              <button
                onClick={nextMove}
                disabled={currentMoveIndex === moveHistory.length - 1}
                className="p-3 bg-slate-700 rounded-xl hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-slate-600"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Control Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={resetOpening}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-slate-900 font-semibold rounded-xl hover:bg-yellow-400 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>

              <button
                onClick={toggleOrientation}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white font-semibold rounded-xl hover:bg-slate-600 transition-colors border border-slate-600"
              >
                <RefreshCw className="h-4 w-4" />
                Flip Board
              </button>

              <button
                onClick={goToFreePractice}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-500 transition-colors"
              >
                <Swords className="h-4 w-4" />
                Practice 
              </button>
            </div>

            {/* Move List */}
            {allMoves.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3 text-yellow-400">Move Sequence</h3>
                <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                  <p className="font-mono text-sm">{opening?.moves}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Variations Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 h-fit sticky top-8">
            <h2 className="text-xl font-bold mb-4 text-yellow-400">Variations</h2>

            {allVariations.length > 0 ? (
              <div className="space-y-3">
                {allVariations.map((variation: Opening) => (
                  <Link
                    key={variation.id}
                    href={`/practice/${variation.id}`}
                    className="block p-3 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-yellow-500/50 hover:bg-slate-700 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-yellow-400 transition-colors line-clamp-1">
                          {variation.name}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">{variation.eco}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-yellow-400 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p>No variations found</p>
              </div>
            )}

            {/* Aliases */}
            {(opening?.aliases ?? []).length > 0 && (
              <div className="mt-6 pt-6 border-t border-slate-700">
                <h3 className="text-lg font-semibold mb-3 text-yellow-400">Also Known As</h3>
                <div className="flex flex-wrap gap-2">
                  {(opening.aliases ?? []).map((alias: Alias) => (
                    <span
                      key={alias.id}
                      className="px-2 py-1 bg-slate-700 text-gray-300 text-xs rounded-md border border-slate-600"
                    >
                      {alias.value}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
