import { useMutation, useQueryClient } from '@tanstack/react-query';
import baseFetch from '../api/baseFetch';

export interface GoalInput {
  updates: {
    title: string;
  }
}
export const useAddGoalMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ updates }: GoalInput) => {
      return baseFetch(`/4-4-dev/goals`, {
        method: 'POST',
        body: JSON.stringify(updates),
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
  });
};
