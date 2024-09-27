import React from "react";
import PopularMoviesList from "../components/PopularMoviesList";
import { Loader2 } from "lucide-react";
import MovieListPagination from "../components/MovieListPagination";
import { usePopularMovies } from "../hooks/useMovies";

interface PopularMoviesProps {
  searchParams?: { page?: string };
}

export default function PopularMovies({ searchParams = {} }: PopularMoviesProps) {
  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;
  const { data, isLoading, isError } = usePopularMovies(page);

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

  if (!data || !data.results || data.results.length === 0) {
    return <div className="text-center">No movies available</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Popular Movies</h1>
      <PopularMoviesList movies={data.results} />
      <div className="mt-8">
        <MovieListPagination currentPage={page} totalPages={data.total_pages} />
      </div>
    </div>
  );
}
