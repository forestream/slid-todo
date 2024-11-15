import { useInfiniteQuery } from '@tanstack/react-query';
import baseFetch from '../api/baseFetch';
import { GetTodosResponse } from '../types/todo';

interface TodosSearchParams {
  goalId?: number;
  done?: boolean;
  size?: number;
}

export const useTodosInfiniteQuery = (searchParams: TodosSearchParams = {}, options = {}) => {
  return useInfiniteQuery<GetTodosResponse>({
    queryKey: ['todos', searchParams],
    queryFn: ({ pageParam }) => {
      // 기본 파라미터 설정
      const stringifiedParams: Record<string, string> = {
        size: String(searchParams.size || 20),
        ...(pageParam !== null && { cursor: String(pageParam) }),
        ...(searchParams.goalId !== undefined && { goalId: String(searchParams.goalId) }),
        ...(searchParams.done !== undefined && { done: String(searchParams.done) }),
      };

      const params = new URLSearchParams(stringifiedParams);
      return baseFetch(`/4-4-dev/todos?${params.toString()}`);
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
