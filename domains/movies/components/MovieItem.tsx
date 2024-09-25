"use client";

import { Movie } from "../types/movie";
import { useFavorites } from "../hooks/useFavorites";

export default function MovieItem({ movie }: { movie: Movie }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.includes(movie.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie.id);
    }
  };

  return (
    <li className="border-b pb-2 flex justify-between items-center">
      <div>
        <h3 className="text-xl font-medium">{movie.title}</h3>
        <p className="text-sm text-gray-600">{movie.release_date}</p>
      </div>
      <button
        onClick={toggleFavorite}
        className={`px-4 py-2 rounded ${
          isFavorite ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </li>
  );
}
