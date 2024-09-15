import PopularMovies from "@/domains/movies/pages/PopularMovies";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome to our Movie App</h1>
      <PopularMovies />
    </main>
  );
}
