import { useInfiniteQuery } from '@tanstack/react-query';
import baseFetch from '../api/baseFetch';
import { GetNotesResponse } from '../types/todo';

interface NotesSearchParams {
  goalId?: number;
  size?: number;
}

export const useNotesInfiniteQuery = (searchParams: NotesSearchParams = {}, options = {}) => {
  return useInfiniteQuery<GetNotesResponse>({
    queryKey: ['notes', searchParams],
    queryFn: ({ pageParam }) => {
      const stringifiedParams: Record<string, string> = {
        size: String(searchParams.size),
        cursor: String(pageParam),
        ...(searchParams.goalId !== undefined && { goalId: String(searchParams.goalId) }),
      };

      const params = new URLSearchParams(stringifiedParams);
      return baseFetch(`/4-4-dev/notes?${params.toString()}`);
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      if (lastPage.nextCursor) {
        return lastPage.nextCursor;
      }
      return undefined;
    },
    staleTime: Infinity,
    ...options,
  });
};
