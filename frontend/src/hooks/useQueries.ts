import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Shoe } from '../backend';

export function useGetAllShoes() {
  const { actor, isFetching } = useActor();

  return useQuery<Shoe[]>({
    queryKey: ['shoes'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllShoes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetShoe(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Shoe>({
    queryKey: ['shoe', id],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not ready');
      return actor.getShoe(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useFilterByCategory(category: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Shoe[]>({
    queryKey: ['shoes', 'category', category],
    queryFn: async () => {
      if (!actor) return [];
      if (category === 'All') return actor.getAllShoes();
      return actor.filterByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}
