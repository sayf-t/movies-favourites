interface DataStore {
  getFavorites(): Promise<number[]>;
  addFavorite(movieId: number): Promise<void>;
  removeFavorite(movieId: number): Promise<void>;
  isFavorite(movieId: number): Promise<boolean>;
}

export type { DataStore };
