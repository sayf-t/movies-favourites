import { Movie, MovieDetails } from '../types/movie';
import { fetchPopularMovies } from '../api/movieApi';

interface TMDBMovieService {
  getPopularMovies(): Promise<Movie[]>;
  getMovieDetails(id: number): Promise<MovieDetails>;
}

class TMDBMovieServiceImpl implements TMDBMovieService {
  async getPopularMovies(): Promise<Movie[]> {
    try {
      const data = await fetchPopularMovies();
      return data.results;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  }

  async getMovieDetails(id: number): Promise<MovieDetails> {
    // TODO: Implement this method using a similar approach to getPopularMovies
    throw new Error('Method not implemented.');
  }
}

export { TMDBMovieServiceImpl };
export type { TMDBMovieService };