import { FavoritesList } from "../components/FavoritesList";

export default function FavoritesPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Favorites</h1>
      <FavoritesList />
    </div>
  );
}
