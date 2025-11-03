// components/RelatedOpeningsPanel.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Opening } from "@/app/generated/prisma/client";

interface RelatedOpeningsPanelProps {
  relatedOpenings: Opening[];
}

const RelatedOpeningsPanel = ({ relatedOpenings }: RelatedOpeningsPanelProps) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-yellow-400">Related Openings</h2>
        <span className="bg-yellow-500/20 text-yellow-400 text-xs font-medium px-2 py-1 rounded-full">
          {relatedOpenings.length}
        </span>
      </div>
      
      <div className="space-y-3 max-h-[500px] md:max-h-[800px] overflow-y-auto">
        {relatedOpenings.map((opening) => (
          <Link
            key={opening.id}
            href={`/practice/${opening.id}`}
            className="block p-4 bg-slate-700/30 rounded-xl border border-slate-600 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block px-2 py-1 bg-yellow-500 text-slate-900 text-xs font-semibold rounded-full">
                    {opening.eco}
                  </span>
                  {opening.isEcoRoot && (
                    <span className="inline-block px-2 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full border border-green-500/30">
                      ECO Root
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-white group-hover:text-yellow-400 transition-colors line-clamp-2 mb-1">
                  {opening.name}
                </h3>
                <p className="text-xs text-gray-400 font-mono bg-slate-800/50 rounded-lg p-2 border border-slate-600">
                  {opening.moves}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-yellow-400 ml-2 shrink-0 mt-6" />
            </div>
          </Link>
        ))}
        {relatedOpenings.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No related openings found</p>
            <p className="text-gray-500 text-sm mt-1">Make some moves to see suggestions</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedOpeningsPanel;