import React from "react";
import { usePopularMovies, MoviePage } from "../hooks/useMovies";
import { MovieCard } from "../components/MovieCard";
import { Loader2 } from "lucide-react";
import { Movie } from "../types/movie";
import { UseInfiniteQueryResult } from "@tanstack/react-query";

interface PaginatedResponse {
  pages: MoviePage[];
  pageParams: number[];
}

export default function PopularMovies() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePopularMovies(1) as UseInfiniteQueryResult<PaginatedResponse, Error>;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return <div className="text-center text-red-500">Error loading movies</div>;
  }

  const allMovies: Movie[] = data?.pages?.flatMap((page: MoviePage) => page.results) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Popular Movies</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {allMovies.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {(hasNextPage || isFetchingNextPage) && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center ${
              isFetchingNextPage ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isFetchingNextPage ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
