import { DataStore } from './DataStore';

class LocalStorageDataStore implements DataStore {
  private key = 'favoriteMovies';

  async getFavorites(): Promise<number[]> {
    const favorites = localStorage.getItem(this.key);
    return favorites ? JSON.parse(favorites) : [];
  }

  async addFavorite(movieId: number): Promise<void> {
    const favorites = await this.getFavorites();
    if (!favorites.includes(movieId)) {
      favorites.push(movieId);
      localStorage.setItem(this.key, JSON.stringify(favorites));
    }
  }

  async removeFavorite(movieId: number): Promise<void> {
    const favorites = await this.getFavorites();
    const updatedFavorites = favorites.filter(id => id !== movieId);
    localStorage.setItem(this.key, JSON.stringify(updatedFavorites));
  }

  async isFavorite(movieId: number): Promise<boolean> {
    const favorites = await this.getFavorites();
    return favorites.includes(movieId);
  }
}

export { LocalStorageDataStore };