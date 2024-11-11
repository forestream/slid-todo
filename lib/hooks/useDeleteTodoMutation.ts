import { useMutation, useQueryClient } from '@tanstack/react-query';
import baseFetch from '../api/baseFetch';
import useToast from '@/components/common/toast/useToast';

export interface DeleteTodoInput {
  todoId: number;
}

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async ({ todoId }: DeleteTodoInput) => {
      return baseFetch(`/4-4-dev/todos/${todoId}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      toast.toast({
        title: '할 일이 삭제되었습니다.',
        variant: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['GoalProgress'] });
    },
    onError: (error) => {
      toast.toast({
        title: '할 일 삭제에 실패했습니다.',
        variant: 'error',
        description: error.message,
      });
    },
  });
};
