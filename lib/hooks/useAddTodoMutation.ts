import { useMutation, useQueryClient } from '@tanstack/react-query';
import baseFetch from '../api/baseFetch';
import useToast from '@/components/common/toast/useToast';

export interface UpdateTodoInput {
  updates: Partial<{
    title: string;
    fileUrl: string | null;
    linkUrl: string | null;
    goalId: number | null;
  }>;
}

export const useAddTodoMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: async ({ updates }: UpdateTodoInput) => {
      return baseFetch(`/4-4-dev/todos`, {
        method: 'POST',
        body: JSON.stringify(updates),
      });
    },

    onSuccess: (data) => {
      toast.toast({
        title: '할 일이 생성되었습니다.',
        variant: 'success',
        description: data.title,
      });
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['GoalProgress'] });
    },
    onError: (error) => {
      toast.toast({
        title: '할 일 생성에 실패했습니다.',
        variant: 'error',
        description: error.message,
      });
    },
  });
};
