import IconFile from '@/public/icons/IconFile';
import IconLink from '@/public/icons/IconLink';
import IconNoteView from '@/public/icons/IconNoteView';
import IconNoteWrite from '@/public/icons/IconNoteWrite';
import DropdownMenu from '../DropdownMenu';
import { IconKebabWithCircle } from '@/public/icons/IconKebabWithCircle';
import { useDeleteTodoMutation } from '@/lib/hooks/useDeleteTodoMutation';
import { Todo } from '@/lib/types/todo';
import { useRef } from 'react';
import TodoEditModal from '@/components/modal/todoModal/TodoEditModal';
import { SheetClose, SheetContent, SheetProvider, SheetTrigger } from '../Sheet';
import { useRouter } from 'next/navigation';
import NoteDetail from '@/components/notes/NoteDetail';
import { MOBILE_BREAKPOINT } from '@/constants';

interface TodoIconProps {
  data: Todo;
}

const TodoIcon: React.FC<TodoIconProps> = ({ data }) => {
  const modalRef = useRef<HTMLButtonElement>(null);
  const deleteTodo = useDeleteTodoMutation();
  const router = useRouter();

  const isMobile = () => window.innerWidth < MOBILE_BREAKPOINT;

  const handleDelete = () => {
    if (isMobile()) return;
    // 삭제할지 모달을 띄워주면 좋겠음
    deleteTodo.mutate({ todoId: data.id });
  };

  const handleDropdaownMenuClick = (item: string) => {
    if (isMobile()) return;
    if (item === '수정하기') {
      modalRef.current?.click();
    } else if (item === '삭제하기') {
      handleDelete();
    }
  };

  const handleDownloadFile = (fileUrl: string | null) => {
    if (isMobile()) return;
    if (!fileUrl) return;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.target = '_blank';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  const handleOpenLink = (linkUrl: string | null) => {
    if (isMobile()) return;
    if (!linkUrl) return;
    window.open(linkUrl, '_blank', 'noopener,noreferrer');
  };

  const handleClickMutateNote = () => {
    if (isMobile()) return;
    router.push(
      `/todos/${data.id}/${data.noteId ? 'note/' + data.noteId : 'create'}?todo=${data.title}&goal=${
        data.goal?.title ?? '목표 없음'
      }`
    );
  };

  return (
    <>
      <div className='flex items-center gap-x-2'>
        {data.fileUrl && (
          <IconFile
            className='sm:hover:stroke-slate-100 sm:hover:fill-slate-200 sm:cursor-pointer'
            onClick={() => handleDownloadFile(data.fileUrl)}
          />
        )}
        {data.linkUrl && (
          <IconLink
            className='sm:hover:stroke-slate-100 sm:hover:fill-slate-200 sm:cursor-pointer'
            onClick={() => handleOpenLink(data?.linkUrl)}
          />
        )}
        {data.noteId && (
          <SheetProvider>
            <SheetTrigger
              onClick={(e) => {
                if (window.innerWidth < 640) {
                  e.preventDefault(); // 클릭 이벤트 차단
                  return;
                }
              }}
            >
              <IconNoteView className='sm:hover:stroke-slate-100 sm:hover:fill-slate-200 sm:cursor-pointer cursor-default' />
            </SheetTrigger>
            <SheetContent className='relative'>
              <div className='overflow-auto h-full'>
                <div className='flex justify-end mb-6'>
                  <SheetClose />
                </div>
                <NoteDetail id={data.noteId ?? 0} goalTitle={data.goal ? data.goal.title : ''} todoTitle={data.title} />
              </div>
            </SheetContent>
          </SheetProvider>
        )}
        <button onClick={handleClickMutateNote}>
          <IconNoteWrite className='sm:hover:stroke-slate-100 sm:hover:fill-slate-200 sm:cursor-pointer w-0 sm:w-auto' />
        </button>
        <div className='flex justify-center items-center'>
          <DropdownMenu
            icon={IconKebabWithCircle}
            dropdownList={['수정하기', '삭제하기']}
            onItemClick={handleDropdaownMenuClick}
            className='sm:hover:stroke-slate-100 sm:hover:fill-slate-200 cursor-pointer w-0 sm:w-auto'
          />
        </div>
      </div>
      <TodoEditModal ref={modalRef} data={data} />
    </>
  );
};

export default TodoIcon;
