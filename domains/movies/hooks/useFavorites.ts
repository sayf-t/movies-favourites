import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LocalStorageDataStore } from '../services/LocalStorageDataStore';

const dataStore = new LocalStorageDataStore();

export function useFavorites() {
  const queryClient = useQueryClient();

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

  return {
    favorites,
    addFavorite: addFavoriteMutation.mutate,
    removeFavorite: removeFavoriteMutation.mutate,
    isAddingFavorite: addFavoriteMutation.isPending,
    isRemovingFavorite: removeFavoriteMutation.isPending,
  };
}