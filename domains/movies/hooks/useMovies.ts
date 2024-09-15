import { useQuery } from "@tanstack/react-query";
import { fetchPopularMovies } from "../api/movieApi";

export function usePopularMovies() {
  return useQuery({
    queryKey: ["authentication"],
    queryFn: fetchPopularMovies,
  });
}
