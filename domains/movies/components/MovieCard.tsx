"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useCallback, useState, memo } from "react";
import { Movie } from "@/domains/movies/types/movie";
import { useFavorites } from "@/domains/favorites/hooks/useFavorites";

interface MovieCardProps {
  movie: Movie;
  onRemoveFavorite?: (movieId: number) => void;
}

const MovieCard = memo(function MovieCard({ movie, onRemoveFavorite }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addFavorite, isAddingFavorite, isRemovingFavorite, isFavorite } = useFavorites();

  const isMovieFavorite = isFavorite(movie.id);

  const handleToggle = useCallback(() => {
    if (isMovieFavorite) {
      onRemoveFavorite?.(movie.id);
    } else {
      addFavorite(movie.id);
    }
  }, [isMovieFavorite, movie.id, onRemoveFavorite, addFavorite]);

  return (
    <div
      className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out transform hover:translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/movies/${movie.id}`} scroll={false}>
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={500}
          height={750}
          className="w-full h-full object-cover"
        />
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h3 className="text-white text-lg font-semibold text-center px-4">{movie.title}</h3>
          </div>
        )}
      </Link>
      <button
        onClick={handleToggle}
        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md"
        disabled={isAddingFavorite || isRemovingFavorite}
      >
        <Heart
          className={`w-6 h-6 ${isMovieFavorite ? "text-red-500" : "text-gray-400"}`}
          style={{ fill: isMovieFavorite ? "red" : "none" }}
        />
      </button>
    </div>
  );
});

export { MovieCard };
