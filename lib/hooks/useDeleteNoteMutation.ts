import { useMutation, useQueryClient } from '@tanstack/react-query';
import baseFetch from '../api/baseFetch';
import useToast from '@/components/common/toast/useToast';

export interface DeleteNoteInput {
  noteId: number;
}

export const useDeleteNoteMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: async ({ noteId }: DeleteNoteInput) => {
      return baseFetch(`/4-4-dev/notes/${noteId}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      toast.toast({
        title: '노트가 삭제되었습니다.',
        variant: 'success',
      });
    },
    onError: (error) => {
      toast.toast({
        title: '노트 삭제에 실패했습니다.',
        variant: 'error',
        description: error.message,
      });
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'notes' && query.queryKey[1] !== variables.noteId,
      });
    },
  });
};
