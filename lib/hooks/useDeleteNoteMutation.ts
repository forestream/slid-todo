import { useMutation, useQueryClient } from '@tanstack/react-query';
import baseFetch from '../api/baseFetch';

export interface DeleteNoteInput {
  noteId: number;
}

export const useDeleteNoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ noteId }: DeleteNoteInput) => {
      return baseFetch(`/4-4-dev/notes/${noteId}`, {
        method: 'DELETE',
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
};
