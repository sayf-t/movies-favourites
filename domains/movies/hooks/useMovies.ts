import { useQuery } from '@tanstack/react-query';
import { Movie, MovieDetails } from '../types/movie';
import { TMDBMovieServiceImpl } from '../services/TMDBMovieService';

const movieService = new TMDBMovieServiceImpl();

export function usePopularMovies() {
  return useQuery<Movie[], Error>({
    queryKey: ['popularMovies'],
    queryFn: () => movieService.getPopularMovies(),
  });
}

export function useMovieDetails(id: number) {
  return useQuery<MovieDetails, Error>({
    queryKey: ['movieDetails', id],
    queryFn: () => movieService.getMovieDetails(id),
  });
}
