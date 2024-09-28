"use client";

import { useFavorites } from "../hooks/useFavorites";
import { Heart } from "lucide-react";

interface FavoriteToggleProps {
  movieId: number;
  onRemove?: (movieId: number) => void;
}

export function FavoriteToggle({ movieId, onRemove }: FavoriteToggleProps) {
  const { addFavorite, removeFavorite, isAddingFavorite, isRemovingFavorite, isFavorite } =
    useFavorites();

  const isMovieFavorite = isFavorite(movieId);

  const handleToggle = () => {
    if (isMovieFavorite) {
      removeFavorite(movieId);
      onRemove && onRemove(movieId);
    } else {
      addFavorite(movieId);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isAddingFavorite || isRemovingFavorite}
      className="p-2 bg-white rounded-full shadow-md"
    >
      <Heart
        className={`w-6 h-6 ${isMovieFavorite ? "text-red-500" : "text-gray-400"}`}
        style={{ fill: isMovieFavorite ? "red" : "none" }}
      />
    </button>
  );
}
