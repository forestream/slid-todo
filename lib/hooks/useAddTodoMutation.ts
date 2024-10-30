import { useMutation, useQueryClient } from '@tanstack/react-query';
import baseFetch from '../api/baseFetch';

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

  return useMutation({
    mutationFn: async ({ updates }: UpdateTodoInput) => {
      return baseFetch(`/4-4-dev/todos`, {
        method: 'POST',
        body: JSON.stringify(updates),
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['GoalProgress'] });
    },
  });
};
