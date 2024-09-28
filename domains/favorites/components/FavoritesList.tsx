"use client";

import { useFavorites } from "../hooks/useFavorites";
import { useMultipleMovieDetails } from "@/domains/movies/hooks/useMovies";
import { MovieCard } from "@/domains/movies/components/MovieCard";
import { LoadingSkeleton } from "@/domains/favorites/components/LoadingSkeleton";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Movie } from "@/domains/movies/types/movie";

export function FavoritesList() {
  const { favorites, isFavoritesLoading, removeFavorite } = useFavorites();
  const { data: movieDetails, isLoading: isMovieDetailsLoading } =
    useMultipleMovieDetails(favorites);
  const [showLoading, setShowLoading] = useState(false);
  const [localMovieDetails, setLocalMovieDetails] = useState<Movie[]>([]);

  useEffect(() => {
    if (movieDetails) {
      setLocalMovieDetails(movieDetails);
    }
  }, [movieDetails]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(isFavoritesLoading || isMovieDetailsLoading);
    }, 200);

    return () => clearTimeout(timer);
  }, [isFavoritesLoading, isMovieDetailsLoading]);

  const handleRemoveFavorite = useCallback(
    (movieId: number) => {
      removeFavorite(movieId);
      setLocalMovieDetails((prevDetails) => prevDetails.filter((movie) => movie.id !== movieId));
    },
    [removeFavorite]
  );

  if (showLoading) {
    return <LoadingSkeleton />;
  }

  if (!localMovieDetails || localMovieDetails.length === 0) {
    return <div>No favorites found.</div>;
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {localMovieDetails.map((movie) => (
        <li key={movie.id}>
          <MovieCard movie={movie} onRemoveFavorite={handleRemoveFavorite} />
        </li>
      ))}
    </ul>
  );
}
