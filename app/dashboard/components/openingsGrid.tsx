// app/dashboard/components/PracticedOpeningsGrid.tsx
import Link from "next/link";
import { Target } from "lucide-react";
import { Opening } from "../../../types";

interface PracticedOpeningsGridProps {
  openings: Opening[];
}

export function PracticedOpeningsGrid({ openings }: PracticedOpeningsGridProps) {
  if (openings.length === 0) return null;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
      <h2 className="text-xl font-bold text-yellow-400 mb-4 flex items-center">
        <Target className="h-5 w-5 mr-2" />
        Most Practiced Openings
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {openings.map((opening) => (
          <Link
            key={opening.id}
            href={`/practice/${opening.id}`}
            className="p-4 bg-slate-700/30 rounded-xl border border-slate-600 hover:border-yellow-500/50 transition-colors cursor-pointer text-center block"
          >
            <div className="bg-yellow-500 text-slate-900 px-2 py-1 rounded-lg text-xs font-bold mb-2">
              {opening.eco}
            </div>
            <h3 className="text-white font-semibold text-sm mb-1 truncate">
              {opening.name}
            </h3>
            <p className="text-gray-400 text-xs mb-2 truncate">
              {opening.moves.split(" ").slice(0, 3).join(" ")}...
            </p>
            <div className="flex items-center justify-center space-x-1 text-yellow-400">
              <Target className="h-3 w-3" />
              <span className="text-xs">{opening.practiceCount} sessions</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}