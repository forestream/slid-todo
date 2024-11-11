import { useMutation, useQueryClient } from '@tanstack/react-query';
import baseFetch from '../api/baseFetch';
import useToast from '@/components/common/toast/useToast';

export interface DeleteGoalInput {
  goalId: number;
}

export const useDeleteGoalMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async ({ goalId }: DeleteGoalInput) => {
      return baseFetch(`/4-4-dev/goals/${goalId}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      toast.toast({
        title: '목표가 삭제되었습니다.',
        variant: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
    onError: (error) => {
      toast.toast({
        title: '목표 삭제에 실패했습니다.',
        variant: 'error',
        description: error.message,
      });
    },
  });
};
