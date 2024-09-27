"use client";

import PopularMovies from "../domains/movies/pages/PopularMovies";

export default function Home({ searchParams }: { searchParams: { page?: string } }) {
  return <PopularMovies searchParams={searchParams} />;
}
