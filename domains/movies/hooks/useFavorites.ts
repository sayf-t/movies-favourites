import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDataStore } from '../contexts/DataStoreContext';

export function useFavorites() {
  const queryClient = useQueryClient();
  const dataStore = useDataStore();

  const { data: favorites = [] } = useQuery({
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

  return {
    favorites,
    addFavorite: addFavoriteMutation.mutate,
    removeFavorite: removeFavoriteMutation.mutate,
    isAddingFavorite: addFavoriteMutation.isPending,
    isRemovingFavorite: removeFavoriteMutation.isPending,
    isFavorite,
  };
}