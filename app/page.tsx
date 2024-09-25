import PopularMovies from "@/domains/movies/pages/PopularMovies";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 sm:p-8 md:p-12 lg:p-24">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-primary">
        Welcome to our Movie App
      </h1>
      <div className="w-full max-w-4xl">
        <PopularMovies />
      </div>
    </main>
  );
}
