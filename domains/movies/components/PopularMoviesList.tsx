import React, { useCallback, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Movie } from "@/domains/movies/types/movie";
import { MovieCard } from "@/domains/movies/components/MovieCard";
import { usePopularMovies } from "../hooks/useMovies";

interface PopularMoviesListProps {
  movies: Movie[];
  currentPage: number;
  totalPages: number;
  onLoadMore: () => void;
}

export default function PopularMoviesList({
  movies,
  currentPage,
  totalPages,
  onLoadMore,
}: PopularMoviesListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: movies.length,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback(() => 300, []), // Adjust based on your MovieCard height
    overscan: 5,
  });

  const loadMoreMovies = useCallback(() => {
    if (currentPage < totalPages) {
      onLoadMore();
    }
  }, [currentPage, totalPages, onLoadMore]);

  if (!movies || movies.length === 0) {
    return <div className="text-center">No movies available</div>;
  }

  return (
    <div ref={parentRef} className="h-screen overflow-auto">
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const movie = movies[virtualRow.index];
          return (
            <div
              key={virtualRow.index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <MovieCard movie={movie} />
            </div>
          );
        })}
      </div>
      {currentPage < totalPages && (
        <div className="flex justify-center mt-4">
          <button onClick={loadMoreMovies} className="px-4 py-2 bg-blue-500 text-white rounded">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
