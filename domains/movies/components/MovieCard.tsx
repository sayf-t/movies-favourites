"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Movie } from "../types/movie";
import { useFavorites } from "../../favorites/hooks/useFavorites";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addFavorite, removeFavorite, isAddingFavorite, isRemovingFavorite, isFavorite } =
    useFavorites();

  const isMovieFavorite = isFavorite(movie.id);

  const handleToggle = () => {
    if (isMovieFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie.id);
    }
  };

  return (
    <div
      className="relative rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/movies/${movie.id}`}>
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={500}
          height={750}
          className="w-full h-auto"
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
          style={{ fill: isMovieFavorite ? "red" : "gray" }} // Ensure fill color is set
        />
      </button>
    </div>
  );
}
