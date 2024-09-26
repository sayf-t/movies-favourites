"use client";

import { useFavorites } from "../hooks/useFavorites";

interface FavoriteToggleProps {
  movieId: number;
}

export function FavoriteToggle({ movieId }: FavoriteToggleProps) {
  const {
    favorites,
    addFavorite,
    removeFavorite,
    isAddingFavorite,
    isRemovingFavorite,
    isFavorite,
  } = useFavorites();

  const handleToggle = () => {
    if (isFavorite(movieId)) {
      removeFavorite(movieId);
    } else {
      addFavorite(movieId);
    }
  };

  return (
    <button onClick={handleToggle} disabled={isAddingFavorite || isRemovingFavorite}>
      {isFavorite(movieId) ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
    </button>
  );
}
