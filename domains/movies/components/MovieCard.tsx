"use client";

import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/domains/movies/types/movie";
import { FavoriteToggle } from "@/domains/favorites/components/FavoriteToggle";
import { useState } from "react";

interface MovieCardProps {
  movie: Movie;
  onRemoveFavorite?: (movieId: number) => void;
}

export function MovieCard({ movie, onRemoveFavorite }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

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
          priority
        />
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h3 className="text-white text-lg font-semibold text-center px-4">{movie.title}</h3>
          </div>
        )}
      </Link>
      <div className="absolute top-2 right-2">
        <FavoriteToggle movieId={movie.id} onRemove={onRemoveFavorite} />
      </div>
    </div>
  );
}
