import { Suspense } from "react";
import TMDBMovieService from "../services/TMDBMovieService";
import MovieItem from "./MovieItem";
import MovieListPagination from "./MovieListPagination";
import { Movie } from "../types/movie";

async function fetchPopularMovies(page: number = 1) {
  const movies = await TMDBMovieService.fetchPopularMovies(page);
  console.log("Movies data:", movies);
  return movies;
}

export default async function PopularMoviesList({ page = 1 }: { page?: number }) {
  const moviesData = await fetchPopularMovies(page);

  return (
    <div>
      <Suspense fallback={<div>Loading movies...</div>}>
        <ul className="space-y-4">
          {moviesData && Array.isArray(moviesData.results) && moviesData.results.length > 0 ? (
            moviesData.results.map((movie: Movie) => <MovieItem key={movie.id} movie={movie} />)
          ) : (
            <li>No movies available</li>
          )}
        </ul>
      </Suspense>
      <MovieListPagination currentPage={page} />
    </div>
  );
}
