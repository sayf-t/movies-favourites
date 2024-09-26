"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PopularMovies from "@/domains/movies/pages/PopularMovies";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Popular Movies</h1>
        <PopularMovies />
      </main>
    </QueryClientProvider>
  );
}
