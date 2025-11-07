// components/openingCard.tsx
"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { Heart, Star, Eye } from "lucide-react";
import { Opening } from "../app/search-openings/page";

interface OpeningCardProps {
  opening: Opening;
  viewMode: "grid" | "list";
  onClick: (openingId: string) => void;
  isFavorite: boolean;
  visitCount: number;
  onToggleFavorite: (openingId: string) => void;
}

const OpeningCard = ({
  opening,
  viewMode,
  onClick,
  isFavorite,
  visitCount,
  onToggleFavorite,
}: OpeningCardProps) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!session) {
      signIn();
      return;
    }

    setIsLoading(true);
    try {
      const newFavoriteState = !isFavorite;

      const response = await fetch("/api/user/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          openingId: opening.id,
          action: newFavoriteState ? "add" : "remove",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update favorite");
      }

      onToggleFavorite(opening.id);
    } catch (error) {
      console.error("Error updating favorite:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = async (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (session) {
      try {
        await fetch("/api/user/visits", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ openingId: opening.id }),
        });
      } catch (error) {
        console.error("Error recording visit:", error);
      }
    }
    onClick(opening.id);
  };

  if (viewMode === "grid") {
    return (
      <div
        onClick={handleCardClick}
        className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-yellow-500/50 transition-all duration-300 cursor-pointer group hover:bg-slate-700/30"
      >
        <div className="flex justify-between items-start mb-3">
          <span className="bg-yellow-500 text-slate-900 px-2 py-1 rounded-lg text-xs font-bold">
            {opening.eco}
          </span>
          {session && (
            <button
              onClick={handleFavoriteClick}
              disabled={isLoading}
              className={`p-2 rounded-xl transition-all duration-200 ${
                isFavorite
                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                  : "bg-slate-700/50 text-gray-400 border border-slate-600 hover:border-red-500/50 hover:text-red-400"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <Heart
                className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`}
              />
            </button>
          )}
        </div>

        <h3 className="text-white font-semibold mb-2 group-hover:text-yellow-400 transition-colors line-clamp-2">
          {opening.name}
        </h3>

        <p className="text-gray-400 text-sm font-mono mb-4 line-clamp-2">
          {opening.moves}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Eye className="h-3 w-3" />
            <span>{visitCount}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3" />
            <span>{opening.totalFavorites || 0}</span>
          </div>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div
      onClick={handleCardClick}
      className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-700 hover:border-yellow-500/50 transition-all duration-300 cursor-pointer group hover:bg-slate-700/30"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
          <div className="bg-yellow-500 text-slate-900 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-bold shrink-0">
            {opening.eco}
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <h3 className="text-white font-semibold group-hover:text-yellow-400 transition-colors truncate text-sm sm:text-base">
              {opening.name}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm font-mono truncate">
              {opening.moves}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4">
          <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">{visitCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">
                {opening.totalFavorites || 0}
              </span>
            </div>
          </div>

          {session && (
            <button
              onClick={handleFavoriteClick}
              disabled={isLoading}
              className={`shrink-0 p-2 sm:p-3 rounded-xl transition-all duration-200 ${
                isFavorite
                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                  : "bg-slate-700/50 text-gray-400 border border-slate-600 hover:border-red-500/50 hover:text-red-400"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <Heart
                className={`h-4 w-4 sm:h-5 sm:w-5 ${
                  isFavorite ? "fill-current" : ""
                }`}
              />
            </button>
          )}
        </div>
      </div>

      <div className="flex sm:hidden items-center justify-between mt-3 pt-3 border-t border-slate-700">
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{visitCount} visits</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            <span>{opening.totalFavorites || 0} favorites</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpeningCard;
