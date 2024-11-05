import { useInfiniteQuery } from '@tanstack/react-query';
import baseFetch from '../api/baseFetch';
import { GetNotesResponse } from '../types/todo';

interface NotesSearchParams {
  goalId?: number;
  size?: number;
}

export const useNotesInfiniteQuery = (searchParams: NotesSearchParams = {}) => {
  return useInfiniteQuery<GetNotesResponse>({
    queryKey: ['notes', searchParams],
    queryFn: ({ pageParam }) => {
      const stringifiedParams: Record<string, string> = {
        size: String(searchParams.size || 20),
        ...(searchParams.goalId !== undefined && { goalId: String(searchParams.goalId) }),
      };

      if (pageParam !== 1) {
        stringifiedParams.cursor = String(pageParam);
      }

      const params = new URLSearchParams(stringifiedParams);
      return baseFetch(`/4-4-dev/notes?${params.toString()}`);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.nextCursor) {
        return lastPage.nextCursor;
      }
      return undefined;
    },
    staleTime: Infinity,
  });
};
