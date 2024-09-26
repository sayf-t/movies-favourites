import { Suspense } from "react";
import TMDBMovieService from "../services/TMDBMovieService";
import { Movie } from "../types/movie";
import { MovieCard } from "./MovieCard";
import MovieListPagination from "./MovieListPagination";

async function fetchPopularMovies(page: number = 1) {
  const movies = await TMDBMovieService.fetchPopularMovies(page);
  console.log("Movies data:", movies);
  return movies;
}

export default async function PopularMoviesList({ page = 1 }: { page?: number }) {
  const moviesData = await fetchPopularMovies(page);

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<div className="text-center">Loading movies...</div>}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {moviesData && Array.isArray(moviesData.results) && moviesData.results.length > 0 ? (
            moviesData.results.map((movie: Movie) => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            <div className="col-span-full text-center">No movies available</div>
          )}
        </div>
      </Suspense>
      <div className="mt-8">
        <MovieListPagination currentPage={page} />
      </div>
    </div>
  );
}
