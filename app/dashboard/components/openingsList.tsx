// app/dashboard/components/openingsList.tsx
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
   
      <div className="space-y-3">
        {openings.length > 0 ? (
          openings.map((opening) => (
            <Link
              key={opening.id}
              href={`/practice/${opening.id}`}
              className="flex items-center p-3 sm:p-4 bg-slate-700/30 rounded-xl border border-slate-600 hover:border-yellow-500/50 transition-colors cursor-pointer gap-3"
            >
              <div className="bg-yellow-500 text-slate-900 px-2 py-1 rounded-lg text-xs font-bold min-w-12 text-center shrink-0">
                {opening.eco}
              </div>
              
              <div className="flex-1 min-w-0 space-y-1">
                <h3 className="text-white font-semibold text-sm sm:text-base truncate">
                  {opening.name}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm truncate">
                  {opening.moves}
                </p>
              </div>
              
              <div className="flex items-center gap-2 shrink-0">
                {metricKey && opening[metricKey] && (
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <FcStatistics className="h-4 w-4" />
                    <span className="text-sm hidden xs:inline">{opening[metricKey]}</span>
                  </div>
                )}
                {!metricKey && (
                  <div className="text-red-400">
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                )}
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-6 sm:py-8">
            <Icon className="h-10 w-10 sm:h-12 sm:w-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 text-sm sm:text-base">No {title.toLowerCase()} yet.</p>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              {title.includes("Favorite")
                ? "Click the heart icon on openings to add them to favorites."
                : "Start exploring openings to see them here."}
            </p>
          </div>
        )}
      </div>
  );
}