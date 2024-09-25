import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Movie, MovieDetails } from '../types/movie';
import TMDBMovieService from '../services/TMDBMovieService';

export function usePopularMovies(): UseQueryResult<Movie[], Error> {
  return useQuery({
    queryKey: ['popularMovies'],
    queryFn: fetchPopularMovies,
  });
}

export function useMovieDetails(id: number): UseQueryResult<MovieDetails, Error> {
  return useQuery({
    queryKey: ['movieDetails', id],
    queryFn: () => fetchMovieDetails(id),
  });
}

// Helper functions
async function fetchPopularMovies(): Promise<Movie[]> {
  try {
    const movies = await TMDBMovieService.fetchPopularMovies();
    if (!movies || movies.length === 0) {
      throw new Error('No movies found');
    }
    return movies;
  } catch (error) {
    console.error('Error in fetchPopularMovies:', error);
    throw new Error('Failed to fetch popular movies');
  }
}

async function fetchMovieDetails(id: number): Promise<MovieDetails> {
  try {
    const details = await TMDBMovieService.getMovieDetails(id);
    if (!details) {
      throw new Error('Movie details not found');
    }
    return details;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${id}:`, error);
    throw new Error(`Failed to fetch movie details for ID ${id}`);
  }
}
