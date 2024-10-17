"use client";

import { useFavorites } from "../hooks/useFavorites";
import { Heart } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface FavoriteToggleProps {
  movieId: number;
  onRemove?: (movieId: number) => void;
}

export function FavoriteToggle({ movieId, onRemove }: FavoriteToggleProps) {
  const queryClient = useQueryClient();
  const { addFavorite, removeFavorite, isAddingFavorite, isRemovingFavorite, isFavorite } =
    useFavorites();

  const isMovieFavorite = isFavorite(movieId);

  const handleToggle = () => {
    if (isMovieFavorite) {
      removeFavorite(movieId);
      onRemove?.(movieId);
    } else {
      addFavorite(movieId);
    }
    // Invalidate and refetch the popularMovies query to update the list
    queryClient.invalidateQueries({ queryKey: ["popularMovies"] });
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
