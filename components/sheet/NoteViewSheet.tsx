import { SheetClose, SheetContent, SheetProvider } from '../common/Sheet';
import NoteDetail from '../notes/NoteDetail';

interface NoteViewSheetProps {
  isSheetOpen: boolean;
  handleSheetOpen: (isOpen: boolean) => void;
  noteId: number | null;
  goal: { title: string } | null;
  todoTitle: string;
}

const NoteViewSheet: React.FC<NoteViewSheetProps> = ({ isSheetOpen, handleSheetOpen, noteId, goal, todoTitle }) => {
  if (!isSheetOpen) return null;
  return (
    <SheetProvider isOpen={isSheetOpen} onChangeIsOpen={handleSheetOpen}>
      <SheetContent position='right'>
        <div className='overflow-auto h-full'>
          <div className='flex justify-end mb-6'>
            <SheetClose />
          </div>
          <NoteDetail id={noteId ?? 0} goalTitle={goal ? goal.title : ''} todoTitle={todoTitle} />
        </div>
      </SheetContent>
    </SheetProvider>
  );
};

export default NoteViewSheet;
