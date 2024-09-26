"use client";

import MovieDetails from "@/domains/movies/pages/MovieDetails";
import { useParams } from "next/navigation";

export default function MovieDetailsPage() {
  const params = useParams();
  const movieId = Number(params?.id);

  return <MovieDetails movieId={movieId} />;
}
