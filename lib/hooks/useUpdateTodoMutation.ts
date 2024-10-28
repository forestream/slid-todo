import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import baseFetch from '../api/baseFetch';
import { findMatchingTodoQueries, isTodosQueryKey } from '../utils/findMatchingTodoQueries';
import { GetTodosResponse } from '../types/todos';

export interface UpdateTodoInput {
  id: number;
  updates: Partial<{
    title: string;
    fileUrl: string | null;
    linkUrl: string | null;
    goalId: number | null;
    done: boolean;
  }>;
}

export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: UpdateTodoInput) => {
      return baseFetch(`/4-4-dev/todos/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
      });
    },

    // onMutate: 쿼리 데이터를 업데이트하기 전에 호출되는 함수
    // 이 함수에서는 이전 쿼리 데이터를 가져와서 업데이트 전 상태를 저장해둔다
    // 낙관적 업데이트를 위해 사용된다
    onMutate: async ({ id, updates }) => {
      console.log('onMutate');
      console.log(
        '클라이언트 업데이트 투두',
        queryClient.getQueriesData({ predicate: (query) => query.queryKey[0] === 'todos' })
      );
      await queryClient.cancelQueries({
        predicate: (query) => isTodosQueryKey(query.queryKey),
      });

      const previousTodos = findMatchingTodoQueries(queryClient);
      console.log('previousTodos', previousTodos);
      previousTodos.forEach(([queryKey, oldData]) => {
        // setquerydata를 했을 때 해당 쿼리를 사용하고 있는 ui가 리랜터링 되는지 테스트 필요
        console.log('queryKey', queryKey);
        console.log('oldData', oldData);
        if (oldData) {
          queryClient.setQueryData<InfiniteData<GetTodosResponse>>(queryKey, () => {
            console.log('oldData', oldData);
            return {
              ...oldData,
              pages: oldData.pages.map((page) => ({
                ...page,
                todos: page.todos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo)),
              })),
            };
          });
        }
      });

      return { previousTodos };
    },
    // onError: 요청이 실패했을 때 호출되는 함수
    // 이 함수에서는 이전 상태로 되돌리는 작업을 수행한다
    // 고로 낙관적 업데이트를 취소하는 역할을 한다
    onError: (_, __, context) => {
      console.log('onError');
      if (context?.previousTodos) {
        context.previousTodos.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    // onSettled: 요청이 성공하거나 실패했을 때 호출되는 함수
    // 이 함수에서는 캐시된 데이터를 무효화한다
    onSettled: () => {
      console.log('onSettled');
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
