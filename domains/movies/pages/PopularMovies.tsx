import React, { Suspense } from "react";
import PopularMoviesList from "../components/PopularMoviesList";
import { Loader2 } from "lucide-react";

interface PopularMoviesProps {
  searchParams?: { page?: string };
}

export default function PopularMovies({ searchParams = {} }: PopularMoviesProps) {
  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Popular Movies</h1>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        }
      >
        <PopularMoviesList page={page} />
      </Suspense>
    </div>
  );
}
