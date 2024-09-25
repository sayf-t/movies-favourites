import { Suspense } from "react";
import PopularMoviesList from "../components/PopularMoviesList";

export default function PopularMovies({ searchParams = {} }: { searchParams?: { page?: string } }) {
  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;

  return (
    <Suspense fallback={<div className="text-center text-lg">Loading...</div>}>
      <PopularMoviesList page={page} />
    </Suspense>
  );
}
