import { IconRectangle } from '@/public/icons/IconRectangle';
import DropdownMenu from '../common/DropdownMenu';
import { IconKebabWithCircle } from '@/public/icons/IconKebabWithCircle';
import { Note } from '@/app/(nav)/notes/[goalId]/page';
import { useDeleteNoteMutation } from '@/lib/hooks/useDeleteNoteMutation';
import { MouseEventHandler, useRef } from 'react';
import NoteDetail from './NoteDetail';
import { SheetClose, SheetContent, SheetProvider, SheetTrigger } from '../common/Sheet';

interface NoteItemProps {
  note: Note;
}

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  const deleteNote = useDeleteNoteMutation();

  const handleDelete = () => {
    // 삭제할지 모달을 띄워주면 좋겠음
    deleteNote.mutate({ noteId: note.id });
  };

  const handleDropdaownMenuClick = (item: string) => {
    if (item === '수정하기') {
      // 수정하기페이지로 이동
    } else if (item === '삭제하기') {
      handleDelete();
    }
  };

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const kebabRef = useRef<HTMLDivElement | null>(null);
  const handleClickTrigger: MouseEventHandler<HTMLDivElement> = (e) => {
    if (kebabRef.current?.contains(e.target as Node)) return;
    triggerRef.current?.click();
  };

  return (
    <>
      <div
        className='p-6 bg-white flex flex-col space-y-4 rounded-xl group cursor-pointer'
        onClick={handleClickTrigger}
      >
        <div className='flex justify-between items-center'>
          <IconRectangle />
          <div ref={kebabRef} className='flex items-center'>
            <DropdownMenu
              icon={IconKebabWithCircle}
              dropdownList={['수정하기', '삭제하기']}
              onItemClick={handleDropdaownMenuClick}
              className='hover:stroke-slate-100 hover:fill-slate-200 cursor-pointer transition-all duration-200 w-0 group-hover:w-auto group-focus-within:w-auto'
            />
          </div>
        </div>
        <div className='flex flex-col gap-y-3'>
          <h2 className='text-lg font-medium line-clamp-2'>{note.title}</h2>
          <hr />
          <div className='flex space-x-2 text-slate-700'>
            <div className='rounded-md bg-slate-100 p-1 text-xs font-medium shrink-0'>To do</div>
            <p className='line-clamp-1'>{note.todo.title}</p>
          </div>
        </div>
      </div>
      <SheetProvider>
        <SheetTrigger ref={triggerRef}></SheetTrigger>
        <SheetContent className='relative'>
          <div className='overflow-auto h-full'>
            <div className='flex justify-end mb-6'>
              <SheetClose />
            </div>
            <NoteDetail id={note.id} goalTitle={note.goal.title} todoTitle={note.todo.title} />
          </div>
        </SheetContent>
      </SheetProvider>
    </>
  );
};

export default NoteItem;
