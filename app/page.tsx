"use client";

import PopularMovies from "@/domains/movies/pages/PopularMovies";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <PopularMovies />
    </main>
  );
}
