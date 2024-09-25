"use client";

import { usePopularMovies } from "../hooks/useMovies";

export default function PopularMovies() {
  const { data, isLoading, error } = usePopularMovies();

  if (isLoading) return <div className="text-center text-lg">Loading...</div>;

  if (error)
    return <div className="text-center text-red-500">An error occurred: {error.message}</div>;

  if (!data || data.length === 0)
    return <div className="text-center text-lg">No movies found.</div>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Popular Movies</h2>
      <ul className="space-y-4">
        {data.map((movie) => (
          <li key={movie.id} className="border-b pb-2">
            <h3 className="text-xl font-medium">{movie.title}</h3>
            <p className="text-sm text-gray-600">{movie.release_date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
