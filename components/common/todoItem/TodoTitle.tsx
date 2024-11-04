import TodoContentsDrawer from '@/components/drawer/TodoContentsDrawer/TodoContentsDrawer';
import ConfirmationModal from '@/components/modal/ConfirmationModal';
import NoteViewSheet from '@/components/sheet/NoteViewSheet';
import { MOBILE_BREAKPOINT } from '@/constants';
import { Todo } from '@/lib/types/todo';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface TodoTitleProps {
  data: Todo;
}

const TodoTitle: React.FC<TodoTitleProps> = ({ data }) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isNoteViewOpen, setIsNoteViewOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const router = useRouter();
  const handleLinkCreateNote = () => {
    router.push(`/todos/${data.id}/note/create?todo=${data.title}&goal=${data.goal?.title ?? '목표 없음'}`);
  };
  const handleTitleClick = () => {
    if (window.innerWidth >= MOBILE_BREAKPOINT) {
      //모바일이 아닐 때
      if (data.noteId) {
        setIsNoteViewOpen(true);
      } else {
        setIsConfirmationModalOpen(true);
      }
    } else {
      // 모바일 일 때
      setIsOpenDrawer(true);
    }
  };

  return (
    <>
      <div
        onClick={handleTitleClick}
        className={twMerge(clsx('truncate hover:text-link cursor-pointer', data.done && 'line-through'))}
      >
        {data.title}
      </div>
      <TodoContentsDrawer isOpen={isOpenDrawer} onChangeIsOpen={setIsOpenDrawer} data={data} />
      <NoteViewSheet
        isSheetOpen={isNoteViewOpen}
        handleSheetOpen={setIsNoteViewOpen}
        noteId={data.noteId}
        goal={data.goal}
        todoTitle={data.title}
      />
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onChangeIsOpen={setIsConfirmationModalOpen}
        itemType='creatNote'
        onConfirm={handleLinkCreateNote}
      />
    </>
  );
};

export default TodoTitle;
