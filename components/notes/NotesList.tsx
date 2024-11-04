import { Note } from '@/lib/types/todo';
import NoteItem from './NoteItem';

interface NotesListProps {
  notes: Note[];
  isFetching: boolean;
}

const NotesList: React.FC<NotesListProps> = ({ notes, isFetching }) => {
  if (!notes.length && !isFetching) {
    return <div className='flex justify-center items-center text-sm text-slate-500'>아직 등록된 노트가 없어요</div>;
  }
  return (
    <div className='flex flex-col space-y-4'>
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </div>
  );
};

export default NotesList;
