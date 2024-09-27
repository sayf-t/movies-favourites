import { useState, useEffect } from 'react';
import { Movie } from '../../movies/types/movie';
import TMDBMovieService from '../../movies/services/TMDBMovieService';

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  function fetchFavorites() {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }

  async function fetchFavoriteMovies() {
    try {
      const moviePromises = favorites.map(async (movieId) => {
        return await TMDBMovieService.getMovieDetails(movieId);
      });
      const movies = await Promise.all(moviePromises);
      setFavoriteMovies(movies);
    } catch (error) {
      console.error('Error fetching favorite movies:', error);
    }
  }

  function toggleFavorite(movieId: number) {
    const updatedFavorites = favorites.includes(movieId)
      ? favorites.filter(id => id !== movieId)
      : [...favorites, movieId];
    
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  }

  return { favorites, favoriteMovies, toggleFavorite, fetchFavoriteMovies };
}