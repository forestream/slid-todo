import IconFile from '@/public/icons/IconFile';
import IconLink from '@/public/icons/IconLink';
import IconNoteView from '@/public/icons/IconNoteView';
import IconNoteWrite from '@/public/icons/IconNoteWrite';
import DropdownMenu from '../DropdownMenu';
import { IconKebabWithCircle } from '@/public/icons/IconKebabWithCircle';
import { useDeleteTodoMutation } from '@/lib/hooks/useDeleteTodoMutation';
import { Todo } from '@/lib/types/todo';
import { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MOBILE_BREAKPOINT } from '@/constants';
import openExternalSite from '@/lib/utils/openExternalSite';
import dynamic from 'next/dynamic';

const TodoEditModal = dynamic(() => import('@/components/modal/todoModal/TodoEditModal'), {
  loading: () => null,
  ssr: false,
});

const NoteViewSheet = dynamic(() => import('@/components/sheet/NoteViewSheet'), {
  loading: () => null,
  ssr: false,
});

const ConfirmationModal = dynamic(() => import('@/components/modal/ConfirmationModal'), {
  loading: () => null,
  ssr: false,
});

interface TodoIconProps {
  data: Todo;
}

const TodoIcon: React.FC<TodoIconProps> = ({ data }) => {
  const [isOpen, onChangeIsOpen] = useState(false);
  const deleteTodo = useDeleteTodoMutation();
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const handleSheetOpen = (isOpen: boolean) => setIsSheetOpen(isOpen);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isMobile = () => window.innerWidth < MOBILE_BREAKPOINT;

  const handleDelete = () => {
    if (isMobile()) return;
    deleteTodo.mutate({ todoId: data.id });
  };

  const handleDropdownMenuClick = (item: string) => {
    if (isMobile()) return;
    if (item === '수정하기') {
      onChangeIsOpen(true);
    } else if (item === '삭제하기') {
      setIsDeleteModalOpen(true);
    }
  };

  const handleDownloadFile = (fileUrl: string | null) => {
    if (isMobile()) return;
    if (!fileUrl) return;
    openExternalSite(fileUrl, '_blank');
  };

  const handleOpenLink = (linkUrl: string | null) => {
    if (isMobile()) return;
    if (!linkUrl) return;
    openExternalSite(linkUrl);
  };

  const handleClickMutateNote = () => {
    if (isMobile()) return;
    router.push(
      `/todos/${data.id}/${data.noteId ? 'note/' + data.noteId : 'create'}?todo=${data.title}&goal=${
        data.goal?.title ?? '목표 없음'
      }`
    );
  };

  const handleSheet = () => {
    if (isMobile()) return;
    setIsSheetOpen(true);
  };

  return (
    <>
      <div className='flex items-center gap-x-2' role='toolbar' aria-label='할 일 관리 도구'>
        {data.fileUrl && (
          <button>
            <IconFile
              className='group'
              circleClassName='sm:group-hover:fill-blue-200'
              onClick={() => handleDownloadFile(data.fileUrl)}
            />
          </button>
        )}
        {data.linkUrl && (
          <button>
            <IconLink
              className='group'
              circleClassName='sm:group-hover:fill-blue-200 '
              onClick={() => handleOpenLink(data?.linkUrl)}
            />
          </button>
        )}
        {data.noteId && (
          <button>
            <IconNoteView className='group' circleClassName='sm:group-hover:fill-orange-200' onClick={handleSheet} />
          </button>
        )}
        <button onClick={handleClickMutateNote}>
          <IconNoteWrite className='w-0 sm:w-auto group' circleClassName='sm:group-hover:fill-orange-200' />
        </button>
        <DropdownMenu
          icon={IconKebabWithCircle}
          dropdownList={['수정하기', '삭제하기']}
          onItemClick={handleDropdownMenuClick}
          iconClassName='sm:hover:stroke-blue-200 cursor-pointer w-0 sm:w-auto'
          labelledById='todo-menu-options'
          tooltipText='더보기'
        />
      </div>
      <Suspense fallback={null}>
        {isOpen && <TodoEditModal isOpen={isOpen} onChangeIsOpen={onChangeIsOpen} data={data} />}
        {isSheetOpen && (
          <NoteViewSheet
            isSheetOpen={isSheetOpen}
            handleSheetOpen={handleSheetOpen}
            noteId={data.noteId}
            goal={data.goal}
            todoTitle={data.title}
          />
        )}
        {isDeleteModalOpen && (
          <ConfirmationModal
            isOpen={isDeleteModalOpen}
            onChangeIsOpen={setIsDeleteModalOpen}
            itemType='todo'
            onConfirm={handleDelete}
          />
        )}
      </Suspense>
    </>
  );
};

export default TodoIcon;
