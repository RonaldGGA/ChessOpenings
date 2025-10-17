// components/chess/PracticeHeader.tsx
interface PracticeHeaderProps {
  opening: any;
  accuracy: number;
  onReset: () => void;
  onFlipBoard: () => void;
  currentOrientation: 'white' | 'black';
}

export default function PracticeHeader({
  opening,
  accuracy,
  onReset,
  onFlipBoard,
  currentOrientation,
}: PracticeHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">
              {opening.name}
            </h1>
            <div className="flex items-center space-x-4 mt-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                {opening.eco}
              </span>
              <span className="text-gray-600">
                Precisión: <strong>{accuracy}%</strong>
              </span>
            </div>
            {opening.description && (
              <p className="mt-2 text-gray-600 max-w-2xl">
                {opening.description}
              </p>
            )}
          </div>
          
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button
              onClick={onFlipBoard}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Girar ({currentOrientation})
            </button>
            <button
              onClick={onReset}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Reiniciar
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}