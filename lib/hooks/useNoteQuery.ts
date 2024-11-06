import { useQuery } from '@tanstack/react-query';
import baseFetch from '../api/baseFetch';
import { SingleNote } from '../types/todo';

const useNoteQuery = (noteId: number) =>
  useQuery<SingleNote>({
    queryKey: ['notes', noteId],
    queryFn: () => baseFetch(`/4-4-dev/notes/${noteId}`),
  });

export default useNoteQuery;
