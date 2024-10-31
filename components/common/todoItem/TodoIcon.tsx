import IconFile from '@/public/icons/IconFile';
import IconLink from '@/public/icons/IconLink';
import IconNoteView from '@/public/icons/IconNoteView';
import IconNoteWrite from '@/public/icons/IconNoteWrite';
import DropdownMenu from '../DropdownMenu';
import { IconKebabWithCircle } from '@/public/icons/IconKebabWithCircle';
import { useDeleteTodoMutation } from '@/lib/hooks/useDeleteTodoMutation';
import { Todo } from '@/lib/types/todos';
import { useRef } from 'react';
import TodoEditModal from '@/components/modal/todoModal/TodoEditModal';
import { SheetClose, SheetContent, SheetProvider, SheetTrigger } from '../Sheet';
import { useRouter } from 'next/navigation';
import NoteDetail from '@/components/notes/NoteDetail';

interface TodoIconProps {
  data: Todo;
}

const TodoIcon: React.FC<TodoIconProps> = ({ data }) => {
  const modalRef = useRef<HTMLButtonElement>(null);
  const deleteTodo = useDeleteTodoMutation();
  const router = useRouter();

  const handleDelete = () => {
    // 삭제할지 모달을 띄워주면 좋겠음
    deleteTodo.mutate({ todoId: data.id });
  };

  const handleDropdaownMenuClick = (item: string) => {
    if (item === '수정하기') {
      modalRef.current?.click();
    } else if (item === '삭제하기') {
      handleDelete();
    }
  };

  const handleDownloadFile = (fileUrl: string | null) => {
    if (!fileUrl) return;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = '';
    link.target = '_blank';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  const handleOpenLink = (linkUrl: string | null) => {
    if (!linkUrl) return;
    window.open(linkUrl, '_blank', 'noopener,noreferrer');
  };

  const handleClickMutateNote = () =>
    router.push(
      `/todos/${data.id}/${data.noteId ? 'note/' + data.noteId : 'create'}?todo=${data.title}&goal=${
        data.goal?.title ?? '목표 없음'
      }`
    );

  return (
    <>
      <div className='flex items-center gap-x-2'>
        {data.fileUrl && (
          <IconFile
            className='hover:stroke-slate-100 hover:fill-slate-200 cursor-pointer'
            onClick={() => handleDownloadFile(data.fileUrl)}
          />
        )}
        {data.linkUrl && (
          <IconLink
            className='hover:stroke-slate-100 hover:fill-slate-200 cursor-pointer'
            onClick={() => handleOpenLink(data?.linkUrl)}
          />
        )}
        {data.noteId && (
          <SheetProvider>
            <SheetTrigger>
              <IconNoteView className='hover:stroke-slate-100 hover:fill-slate-200 cursor-pointer' />
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
          <IconNoteWrite className='hover:stroke-slate-100 hover:fill-slate-200 cursor-pointer' />
        </button>
        <div className='flex justify-center items-center'>
          <DropdownMenu
            icon={IconKebabWithCircle}
            dropdownList={['수정하기', '삭제하기']}
            onItemClick={handleDropdaownMenuClick}
            className='hover:stroke-slate-100 hover:fill-slate-200 cursor-pointer transition-all duration-200 w-0 group-hover:w-auto group-focus-within:w-auto'
          />
        </div>
      </div>
      <TodoEditModal ref={modalRef} data={data} />
    </>
  );
};

export default TodoIcon;
