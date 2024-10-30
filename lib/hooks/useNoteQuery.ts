import { useQuery } from '@tanstack/react-query';
import baseFetch from '../api/baseFetch';
import { Note } from '../types';

const useNoteQuery = (noteId: number) =>
  useQuery<Note>({
    queryKey: ['notes', noteId],
    queryFn: () => baseFetch(`/4-4-dev/notes/${noteId}`),
  });

export default useNoteQuery;
