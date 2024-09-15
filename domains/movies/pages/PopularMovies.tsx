"use client";

import { usePopularMovies } from "../hooks/useMovies";

export default function PopularMovies() {
  const { data, isLoading, error } = usePopularMovies();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <h1>API Response</h1>
      <div>{JSON.stringify(data, null, 2)}</div>
    </div>
  );
}
