import { useQuery } from "@tanstack/react-query";
import TMDBMovieService from "../services/TMDBMovieService";
import { FavoriteToggle } from "../components/FavoriteToggle";

interface MovieDetailsProps {
  movieId: number | undefined;
}

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

  if (!movieId) return <div>No movie ID provided</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <FavoriteToggle movieId={movie.id} />
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}/10</p>
    </div>
  );
}
