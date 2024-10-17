import { useInfiniteQuery, UseInfiniteQueryResult, useQuery, UseQueryResult } from '@tanstack/react-query';
import { Movie, MovieDetails } from '@/domains/movies/types/movie';
import TMDBMovieService from '@/domains/movies/services/TMDBMovieService';

export interface MoviePage {
  results: Movie[];
  total_pages: number;
}

export function usePopularMovies(initialPage: number): UseInfiniteQueryResult<MoviePage, Error> {
  return useInfiniteQuery({
    queryKey: ['popularMovies'],
    queryFn: ({ pageParam = initialPage }) => fetchPopularMovies(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
    initialPageParam: initialPage,
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

async function fetchPopularMovies(page: number): Promise<MoviePage> {
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
