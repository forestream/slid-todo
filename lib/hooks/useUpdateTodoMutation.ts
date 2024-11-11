import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import baseFetch from '../api/baseFetch';
import { findMatchingTodoQueries, isTodosQueryKey } from '../utils/findMatchingTodoQueries';
import { GetTodosResponse } from '../types/todo';
import useToast from '@/components/common/toast/useToast';

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
  const toast = useToast();

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
      await queryClient.cancelQueries({
        predicate: (query) => isTodosQueryKey(query.queryKey),
      });

      const previousTodos = findMatchingTodoQueries(queryClient);
      previousTodos.forEach(([queryKey, oldData]) => {
        if (oldData) {
          queryClient.setQueryData<InfiniteData<GetTodosResponse>>(queryKey, () => {
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
    onSuccess: (data) => {
      toast.toast({
        title: '할 일이 수정되었습니다.',
        variant: 'success',
        description: data.title,
      });
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['GoalProgress'] });
    },
    // onError: 요청이 실패했을 때 호출되는 함수
    // 이 함수에서는 이전 상태로 되돌리는 작업을 수행한다
    // 고로 낙관적 업데이트를 취소하는 역할을 한다
    onError: (error, __, context) => {
      if (context?.previousTodos) {
        context.previousTodos.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      toast.toast({
        title: '할 일 수정에 실패했습니다.',
        variant: 'error',
        description: error.message,
      });
    },
  });
};
