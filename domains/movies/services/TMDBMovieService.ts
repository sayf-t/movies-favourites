const API_KEY = process.env.TMDB_API_KEY || "";

class TMDBMovieService {
  private static validateApiKey() {
    if (!API_KEY) {
      throw new Error("API key is not set");
    }
  }

  private static async fetchFromTMDB(endpoint: string) {
    this.validateApiKey();
    const response = await fetch(`https://api.themoviedb.org/3${endpoint}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }

  static async fetchPopularMovies(page: number = 1) {
    return this.fetchFromTMDB(`/movie/popular?page=${page}`);
  }

  // static async searchMovies(query: string) { ... }
  static async getMovieDetails(id: number) {
    return this.fetchFromTMDB(`/movie/${id}`);
  }
}

export default TMDBMovieService;
