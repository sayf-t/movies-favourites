import React from "react";
import { useQuery } from "@tanstack/react-query";
import TMDBMovieService from "../services/TMDBMovieService";
import { FavoriteToggle } from "../components/FavoriteToggle";
import { Loader2, AlertCircle, Star } from "lucide-react";

interface MovieDetailsProps {
  movieId: number | undefined;
}

const Alert = ({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "destructive";
}) => (
  <div
    className={`p-4 rounded-md ${variant === "destructive" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`}
  >
    {children}
  </div>
);

export default function MovieDetails({ movieId }: MovieDetailsProps) {
  const {
    data: movie,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () =>
      movieId ? TMDBMovieService.getMovieDetails(movieId) : Promise.reject("No movie ID"),
    enabled: !!movieId,
  });

  if (!movieId)
    return (
      <Alert variant="destructive">
        <div className="flex items-center">
          <AlertCircle className="h-4 w-4 mr-2" />
          <strong>Error:</strong>
        </div>
        <p>No movie ID provided</p>
      </Alert>
    );

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );

  if (error)
    return (
      <Alert variant="destructive">
        <div className="flex items-center">
          <AlertCircle className="h-4 w-4 mr-2" />
          <strong>Error:</strong>
        </div>
        <p>{(error as Error).message}</p>
      </Alert>
    );

  if (!movie)
    return (
      <Alert variant="destructive">
        <div className="flex items-center">
          <AlertCircle className="h-4 w-4 mr-2" />
          <strong>Error:</strong>
        </div>
        <p>Movie not found</p>
      </Alert>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          <div className="flex items-center mb-4">
            <Star className="text-yellow-400 mr-2" />
            <span className="text-lg font-semibold">{movie.vote_average.toFixed(1)}/10</span>
          </div>
          <FavoriteToggle movieId={movie.id} />
          <p className="text-gray-700 mb-4">{movie.overview}</p>
          <p className="text-sm text-gray-500">Release Date: {movie.release_date}</p>
        </div>
      </div>
    </div>
  );
}
