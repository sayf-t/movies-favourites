import React, { useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FavoriteToggle } from "../../favorites/components/FavoriteToggle";
import TMDBMovieService from "../services/TMDBMovieService";

export function MovieList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["movies"],
    queryFn: ({ pageParam = 1 }) => TMDBMovieService.fetchPopularMovies(pageParam),
    getNextPageParam: (lastPage, pages) =>
      pages.length < lastPage.total_pages ? pages.length + 1 : undefined,
    initialPageParam: 1,
  });

  const allMovies = data ? data.pages.flatMap((page) => page.results) : [];

  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allMovies.length + 1 : allMovies.length,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback(() => 100, []),
    overscan: 5,
  });

  const loadMoreMovies = useCallback(
    (index: number) => {
      if (!hasNextPage || isFetchingNextPage) return;
      if (index === allMovies.length - 1) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, allMovies.length, fetchNextPage]
  );

  return (
    <div ref={parentRef} className="h-screen overflow-auto">
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const movie = allMovies[virtualRow.index];
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
              {movie ? (
                <div className="flex items-center justify-between p-4 border-b">
                  <span>{movie.title}</span>
                  <FavoriteToggle movieId={movie.id} />
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">Loading more...</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
