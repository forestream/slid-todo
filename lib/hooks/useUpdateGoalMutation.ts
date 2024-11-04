import { useMutation, useQueryClient } from '@tanstack/react-query';
import baseFetch from '../api/baseFetch';

export interface UpdateGoalInput {
  id: number;
  updates: { title: string; };
}

export const useUpdateGoalMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: UpdateGoalInput) => {
      return baseFetch(`/4-4-dev/goals/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
  });
};
