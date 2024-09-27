import React from "react";
import { useQuery } from "@tanstack/react-query";
import TMDBMovieService from "../services/TMDBMovieService";
import { FavoriteToggle } from "../../favorites/components/FavoriteToggle";
import { Loader2, AlertCircle, Star } from "lucide-react";
import Image from "next/image";

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

  const imageStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div>
      <div className="relative" style={{ height: "80vh", ...imageStyle }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-4 py-8 relative z-10 h-full flex items-end">
          <h1 className="text-5xl font-bold text-white">{movie.title}</h1>{" "}
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex md:flex-row flex-col gap-4">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={300}
            height={450}
            className="w-full h-auto md:max-w-[300px]"
          />
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
    </div>
  );
}
