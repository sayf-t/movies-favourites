import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Movie, MovieDetails } from '../types/movie';
import TMDBMovieService from '../services/TMDBMovieService';

export function usePopularMovies(page: number): UseQueryResult<{ results: Movie[], total_pages: number }, Error> {
  return useQuery({
    queryKey: ['popularMovies', page],
    queryFn: () => fetchPopularMovies(page),
  });
}

export function useMovieDetails(id: number): UseQueryResult<MovieDetails, Error> {
  return useQuery({
    queryKey: ['movieDetails', id],
    queryFn: () => fetchMovieDetails(id),
  });
}

export function useMultipleMovieDetails(ids: number[]): UseQueryResult<MovieDetails[], Error> {
  return useQuery({
    queryKey: ['multipleMovieDetails', ids],
    queryFn: () => Promise.all(ids.map(fetchMovieDetails)),
  });
}

async function fetchPopularMovies(page: number): Promise<{ results: Movie[], total_pages: number }> {
  try {
    const moviesData = await TMDBMovieService.fetchPopularMovies(page);
    if (!moviesData || !moviesData.results || moviesData.results.length === 0) {
      throw new Error('No movies found');
    }
    return moviesData;
  } catch (error) {
    console.error('Error in fetchPopularMovies:', error);
    throw new Error('Failed to fetch popular movies');
  }
}

async function fetchMovieDetails(id: number): Promise<MovieDetails | null> {
  try {
    const details = await TMDBMovieService.getMovieDetails(id);
    if (!details) {
      throw new Error('Movie details not found');
    }
    return {
      ...details,
      genres: details.genres || [],
      runtime: details.runtime || 0,
      budget: details.budget || 0,
      revenue: details.revenue || 0,
      tagline: details.tagline || '',
    };
  } catch (error) {
    console.error(`Error fetching movie details for ID ${id}:`, error);
    return null;
  }
}
