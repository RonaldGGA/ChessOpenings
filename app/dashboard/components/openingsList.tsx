// app/dashboard/components/OpeningsList.tsx
import Link from "next/link";
import { Star } from "lucide-react";
import { FcStatistics } from "react-icons/fc";
import { Opening } from "../../../types";

interface OpeningsListProps {
  openings: Opening[];
  title: string;
  icon: React.ElementType;
  metricKey?: "visitCount" | "practiceCount";
}

export function OpeningsList({ 
  openings, 
  title, 
  icon: Icon, 
  metricKey 
}: OpeningsListProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
      <h2 className="text-xl font-bold text-yellow-400 mb-4 flex items-center">
        <Icon className="h-5 w-5 mr-2" />
        {title}
      </h2>
      <div className="space-y-3">
        {openings.length > 0 ? (
          openings.map((opening) => (
            <Link
              key={opening.id}
              href={`/practice/${opening.id}`}
              className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600 hover:border-yellow-500/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3 flex-1">
                <div className="bg-yellow-500 text-slate-900 px-2 py-1 rounded-lg text-xs font-bold min-w-12 text-center">
                  {opening.eco}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold truncate">
                    {opening.name}
                  </h3>
                  <p className="text-gray-400 text-sm truncate">
                    {opening.moves}
                  </p>
                </div>
              </div>
              {metricKey && opening[metricKey] && (
                <div className="flex items-center space-x-1 text-yellow-400">
                  <FcStatistics className="h-4 w-4" />
                  <span className="text-sm">{opening[metricKey]}</span>
                </div>
              )}
              {!metricKey && (
                <div className="text-red-400">
                  <Star className="h-4 w-4 fill-current" />
                </div>
              )}
            </Link>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon className="h-12 w-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No {title.toLowerCase()} yet.</p>
            <p className="text-gray-500 text-sm mt-1">
              {title.includes("Favorite")
                ? "Click the heart icon on openings to add them to favorites."
                : "Start exploring openings to see them here."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}