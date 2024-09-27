import { Movie } from "../types/movie";
import { MovieCard } from "./MovieCard";

interface PopularMoviesListProps {
  movies: Movie[];
}

export default function PopularMoviesList({ movies }: PopularMoviesListProps) {
  if (!movies || movies.length === 0) {
    return <div className="text-center">No movies available</div>;
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {movies.map((movie: Movie) => (
        <div key={movie.id} className="w-full">
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
}
