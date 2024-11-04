import { useMutation, useQueryClient } from '@tanstack/react-query';
import baseFetch from '../api/baseFetch';

export interface DeleteGoalInput {
  goalId: number;
}

export const useDeleteGoalMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ goalId }: DeleteGoalInput) => {
      return baseFetch(`/4-4-dev/goals/${goalId}`, {
        method: 'DELETE',
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
  });
};
