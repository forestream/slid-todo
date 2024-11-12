import { useMutation, useQueryClient } from '@tanstack/react-query';
import baseFetch from '../api/baseFetch';
import useToast from '@/components/common/toast/useToast';

export interface UpdateGoalInput {
  id: number;
  updates: { title: string };
}

export const useUpdateGoalMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async ({ id, updates }: UpdateGoalInput) => {
      return baseFetch(`/4-4-dev/goals/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
      });
    },
    onSuccess: () => {
      toast.toast({
        title: '목표가 수정되었습니다.',
        variant: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['goals'], refetchType: 'all' });

    },
    onError: (error) => {
      toast.toast({
        title: '목표 수정에 실패했습니다.',
        variant: 'error',
        description: error.message,
      });
    },
  });
};
