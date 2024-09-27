"use client";

import { useFavorites } from "../hooks/useFavorites";

interface FavoriteToggleProps {
  movieId: number;
}

export function FavoriteToggle({ movieId }: FavoriteToggleProps) {
  const { addFavorite, removeFavorite, isAddingFavorite, isRemovingFavorite, isFavorite } =
    useFavorites();

  const handleToggle = () => {
    if (isFavorite(movieId)) {
      removeFavorite(movieId);
    } else {
      addFavorite(movieId);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isAddingFavorite || isRemovingFavorite}
      className={`px-4 py-2 rounded ${
        isFavorite(movieId) ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
      }`}
    >
      {isFavorite(movieId) ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
    </button>
  );
}
