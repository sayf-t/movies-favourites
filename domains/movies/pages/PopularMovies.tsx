"use client";

import { usePopularMovies } from "../hooks/useMovies";

export default function PopularMovies() {
  const { data, isLoading, error } = usePopularMovies();

  if (isLoading) return <div className="text-center text-lg">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">An error occurred: {error.message}</div>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Popular Movies</h2>
      <pre className="bg-gray-100 p-4 rounded overflow-x-auto">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
