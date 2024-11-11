import { useMutation, useQueryClient } from '@tanstack/react-query';
import baseFetch from '../api/baseFetch';
import useToast from '@/components/common/toast/useToast';

export interface GoalInput {
  updates: {
    title: string;
  };
}
export const useAddGoalMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: async ({ updates }: GoalInput) => {
      return baseFetch(`/4-4-dev/goals`, {
        method: 'POST',
        body: JSON.stringify(updates),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      toast.toast({
        title: '목표가 생성되었습니다.',
        variant: 'success',
      });
    },
    onError: (error) => {
      toast.toast({
        title: '목표 생성에 실패했습니다.',
        variant: 'error',
        description: error.message,
      });
    },
  });
};
