// components/OpeningCard.tsx
"use client";

import { MouseEventHandler, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { Heart, Star, Eye } from "lucide-react";
import { Opening } from "../explore/page";

interface OpeningCardProps {
  opening: Opening;
  viewMode: "grid" | "list";
  onClick: (openingId: string) => void;
  isFavorite?: boolean;
  visitCount?: number;
  onToggleFavorite?: (openingId: string, isFavorite: boolean) => void;
}

const OpeningCard = ({
  opening,
  viewMode,
  onClick,
  isFavorite = false,
  visitCount = 0,
  onToggleFavorite,
}: OpeningCardProps) => {
  const { data: session } = useSession();
  const [isFav, setIsFav] = useState(isFavorite);
  const [isLoading, setIsLoading] = useState(false);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!session) {
      signIn();
      return;
    }

    setIsLoading(true);
    try {
      const newFavoriteState = !isFav;
      setIsFav(newFavoriteState);

      // Llamar a la API para actualizar favoritos
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

      // Notificar al componente padre
      onToggleFavorite?.(opening.id, newFavoriteState);
    } catch (error) {
      console.error("Error updating favorite:", error);
      setIsFav(!isFav); // Revertir en caso de error
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = async (e: { stopPropagation: () => void; }) => {
    e.stopPropagation();
    // Registrar visita si el usuario está autenticado
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
        {/* Header con ECO y Botón de Favorito */}
        <div className="flex justify-between items-start mb-3">
          <span className="bg-yellow-500 text-slate-900 px-2 py-1 rounded-lg text-xs font-bold">
            {opening.eco}
          </span>
          {session && (
            <button
              onClick={handleFavoriteClick}
              disabled={isLoading}
              className={`p-2 rounded-xl transition-all duration-200 ${
                isFav
                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                  : "bg-slate-700/50 text-gray-400 border border-slate-600 hover:border-red-500/50 hover:text-red-400"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <Heart className={`h-4 w-4 ${isFav ? "fill-current" : ""}`} />
            </button>
          )}
        </div>

        {/* Nombre de la Apertura */}
        <h3 className="text-white font-semibold mb-2 group-hover:text-yellow-400 transition-colors line-clamp-2">
          {opening.name}
        </h3>

        {/* Movimientos */}
        <p className="text-gray-400 text-sm font-mono mb-4 line-clamp-2">
          {opening.moves}
        </p>

        {/* Footer con Estadísticas */}
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

  // Vista de lista
  return (
    <div
      onClick={handleCardClick}
      className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-yellow-500/50 transition-all duration-300 cursor-pointer group hover:bg-slate-700/30"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          {/* ECO Code */}
          <div className="bg-yellow-500 text-slate-900 px-3 py-1 rounded-lg text-sm font-bold min-w-16 text-center">
            {opening.eco}
          </div>

          {/* Información de la Apertura */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold group-hover:text-yellow-400 transition-colors truncate">
              {opening.name}
            </h3>
            <p className="text-gray-400 text-sm font-mono truncate">
              {opening.moves}
            </p>
          </div>

          {/* Estadísticas */}
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{visitCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4" />
              <span>{opening.totalFavorites || 0}</span>
            </div>
          </div>
        </div>

        {/* Botón de Favorito */}

        <button
          onClick={handleFavoriteClick}
          disabled={isLoading}
          className={`cursor-pointer ml-4 p-3 rounded-xl transition-all duration-200 ${
            isFav
              ? "bg-red-500/20 text-red-400 border border-red-500/30"
              : "bg-slate-700/50 text-gray-400 border border-slate-600 hover:border-red-500/50 hover:text-red-400"
          } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <Heart className={`h-5 w-5 ${isFav ? "fill-current" : ""}`} />
        </button>
      </div>
    </div>
  );
};

export default OpeningCard;
