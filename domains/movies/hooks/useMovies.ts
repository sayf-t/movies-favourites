import { useQuery } from '@tanstack/react-query';
import { Movie, MovieDetails } from '../types/movie';
import { TMDBMovieServiceImpl } from '../services/TMDBMovieService';

const movieService = new TMDBMovieServiceImpl();

export function usePopularMovies() {
  return useQuery<Movie[], Error>({
    queryKey: ['popularMovies'],
    queryFn: async () => {
      try {
        const movies = await movieService.getPopularMovies();
        if (!movies || movies.length === 0) {
          throw new Error('No movies found');
        }
        return movies;
      } catch (error) {
        console.error('Error in usePopularMovies:', error);
        throw new Error('Failed to fetch popular movies');
      }
    },
  });
}

export function useMovieDetails(id: number) {
  return useQuery<MovieDetails, Error>({
    queryKey: ['movieDetails', id],
    queryFn: async () => {
      try {
        const details = await movieService.getMovieDetails(id);
        if (!details) {
          throw new Error('Movie details not found');
        }
        return details;
      } catch (error) {
        console.error(`Error fetching movie details for ID ${id}:`, error);
        throw new Error(`Failed to fetch movie details for ID ${id}`);
      }
    },
  });
}
