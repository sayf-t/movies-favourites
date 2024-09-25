import { Movie, MovieDetails } from '../types/movie';

interface TMDBMovieService {
  getPopularMovies(): Promise<Movie[]>;
  getMovieDetails(id: number): Promise<MovieDetails>;
}

class TMDBMovieServiceImpl implements TMDBMovieService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || '';
    this.baseUrl = 'https://api.themoviedb.org/3';
  }

  async getPopularMovies(): Promise<Movie[]> {
    const response = await fetch(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}`);
    const data = await response.json();
    return data.results;
  }

  async getMovieDetails(id: number): Promise<MovieDetails> {
    const response = await fetch(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`);
    return await response.json();
  }
}

export { TMDBMovieServiceImpl };
export type { TMDBMovieService };