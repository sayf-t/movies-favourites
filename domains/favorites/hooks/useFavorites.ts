"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDataStore } from '../../movies/contexts/DataStoreContext';

export function useFavorites() {
  const queryClient = useQueryClient();
  const dataStore = useDataStore();

  const { data: favorites = [], isLoading: isFavoritesLoading } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => dataStore.getFavorites(),
  });

  const addFavoriteMutation = useMutation({
    mutationFn: (movieId: number) => dataStore.addFavorite(movieId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: (movieId: number) => dataStore.removeFavorite(movieId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  const isFavorite = (movieId: number) => favorites.includes(movieId);

  const toggleFavorite = (movieId: number) => {
    if (isFavorite(movieId)) {
      removeFavoriteMutation.mutate(movieId);
    } else {
      addFavoriteMutation.mutate(movieId);
    }
  };

  return {
    favorites,
    isFavoritesLoading,
    addFavorite: addFavoriteMutation.mutate,
    removeFavorite: removeFavoriteMutation.mutate,
    isAddingFavorite: addFavoriteMutation.isPending,
    isRemovingFavorite: removeFavoriteMutation.isPending,
    isFavorite,
    toggleFavorite,
  };
}