import { useFavorites } from "../hooks/useFavorites";

export function FavoritesList() {
  const { favorites, isFavoritesLoading } = useFavorites();

  if (isFavoritesLoading) {
    return <div>Loading favorites...</div>;
  }

  return (
    <ul>
      {favorites.map((movieId) => (
        <li key={movieId}>Movie ID: {movieId}</li>
      ))}
    </ul>
  );
}
