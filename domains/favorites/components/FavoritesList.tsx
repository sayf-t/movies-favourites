import { useEffect } from "react";
import { useFavorites } from "../hooks/useFavorites";
import { MovieCard } from "../../movies/components/MovieCard";

export function FavoritesList() {
  const { favoriteMovies, fetchFavoriteMovies } = useFavorites();

  useEffect(() => {
    fetchFavoriteMovies();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Favorite Movies</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <div className="col-span-full text-center">No favorite movies yet</div>
        )}
      </div>
    </div>
  );
}
