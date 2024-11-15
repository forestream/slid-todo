import { MOBILE_BREAKPOINT } from '@/constants';
import { Todo } from '@/lib/types/todo';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const NoteViewSheet = dynamic(() => import('@/components/sheet/NoteViewSheet'), {
  loading: () => null,
  ssr: false,
});

const TodoContentsDrawer = dynamic(() => import('@/components/drawer/TodoContentsDrawer/TodoContentsDrawer'), {
  loading: () => null,
  ssr: false,
});

const ConfirmationModal = dynamic(() => import('@/components/modal/ConfirmationModal'), {
  loading: () => null,
  ssr: false,
});

interface TodoTitleProps {
  data: Todo;
  variant?: 'default' | 'detailed';
}

const TodoTitle: React.FC<TodoTitleProps> = ({ data, variant }) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isNoteViewOpen, setIsNoteViewOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const router = useRouter();
  const handleLinkCreateNote = () => {
    router.push(`/todos/${data.id}/create?todo=${data.title}&goal=${data.goal?.title ?? '목표 없음'}`);
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
      <button
        onClick={handleTitleClick}
        className={twMerge(
          clsx(
            'line-clamp-1 hover:text-link text-left',
            data.done && 'line-through',
            variant === 'detailed' && 'text-xl line-clamp-2'
          )
        )}
        aria-label={`${data.title} ${data.done ? '(완료됨)' : ''}`}
        aria-expanded={isOpenDrawer || isNoteViewOpen}
      >
        {data.title}
      </button>
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
