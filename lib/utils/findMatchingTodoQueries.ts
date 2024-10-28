import { InfiniteData, QueryKey, useQueryClient } from '@tanstack/react-query';
import { GetTodosResponse } from '../types/todos';

export const isTodosQueryKey = (queryKey: QueryKey): queryKey is ['todos'] | ['todos', Record<string, unknown>] => {
  return Array.isArray(queryKey) && queryKey[0] === 'todos';
};

export const findMatchingTodoQueries = (queryClient: ReturnType<typeof useQueryClient>) => {
  return queryClient.getQueriesData<InfiniteData<GetTodosResponse>>({
    predicate: (query) => isTodosQueryKey(query.queryKey),
  });
};
