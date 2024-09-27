"use client";

import { useFavorites } from "../hooks/useFavorites";
import { useMultipleMovieDetails } from "../../movies/hooks/useMovies";
import Link from "next/link";
import Image from "next/image";

export function FavoritesList() {
  const { favorites, isFavoritesLoading } = useFavorites();
  const { data: movieDetails, isLoading: isMovieDetailsLoading } =
    useMultipleMovieDetails(favorites);

  if (isFavoritesLoading || isMovieDetailsLoading) {
    return <div>Loading favorites...</div>;
  }

  if (!movieDetails || movieDetails.length === 0) {
    return <div>No favorites found.</div>;
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {movieDetails.map((movie) => (
        <li key={movie.id} className="border rounded p-4">
          <Link href={`/movies/${movie.id}`} className="text-xl font-semibold hover:underline">
            {movie.title}
          </Link>
          <p className="text-sm text-gray-600">{movie.release_date}</p>
          {movie.poster_path && (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={500}
              height={750}
              className="w-full h-auto"
            />
          )}
        </li>
      ))}
    </ul>
  );
}
