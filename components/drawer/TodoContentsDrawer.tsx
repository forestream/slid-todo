import { Todo } from '@/lib/types/todo';
import { SheetContent, SheetProvider } from '../common/Sheet';
import IconFile from '@/public/icons/IconFile';
import IconLink from '@/public/icons/IconLink';
import IconNoteView from '@/public/icons/IconNoteView';
import IconNoteWrite from '@/public/icons/IconNoteWrite';
import Button from '../common/ButtonSlid';
import { useRouter } from 'next/navigation';
import NoteViewSheet from '../sheet/NoteViewSheet';
import { useState } from 'react';
import { useDeleteTodoMutation } from '@/lib/hooks/useDeleteTodoMutation';
import TodoEditModal from '../modal/todoModal/TodoEditModal';

interface TodoContentsDrawerProps {
  isopen: boolean;
  onChangeIsOpen: (isOpen: boolean) => void;
  data: Todo;
}

const TodoContentsDrawer: React.FC<TodoContentsDrawerProps> = ({ isopen, onChangeIsOpen, data }) => {
  const [isNoteViewOpen, setIsNoteViewOpen] = useState(false);
  const [isEditTodoModalOpen, setIsEditTodoModalOpen] = useState(false);
  const router = useRouter();
  const deleteTodo = useDeleteTodoMutation();
  const handleDelete = () => {
    // 삭제할지 모달을 띄워주면 좋겠음
    console.log('deleteTodo.mutate');
    deleteTodo.mutate({ todoId: data.id });
  };
  const handleEditTodoModalOpen = () => {
    setIsEditTodoModalOpen(true);
  };
  const handleDownloadFile = () => {
    if (!data.fileUrl) return;
    window.open(data.fileUrl, '_blank', 'noopener,noreferrer');
  };
  const handleLinkUrl = () => {
    if (!data.linkUrl) return;
    window.open(data.linkUrl, '_blank', 'noopener,noreferrer');
  };
  const handleNoteView = () => {
    setIsNoteViewOpen(true);
  };
  const handleNoteWrite = () => {
    router.push(`/todos/${data.id}/${data.noteId}/create?todo=${data.title}&goal=${data.goal?.title ?? '목표 없음'}`);
  };
  const handleNoteEdit = () => {
    router.push(`todos/${data.id}/note/${data.noteId}?todo=${data.title}&goal=${data.goal?.title ?? '목표 없음'}`);
  };
  return (
    <>
      <SheetProvider isOpen={isopen} onChangeIsOpen={onChangeIsOpen}>
        <SheetContent position='bottom' className='w-full h-auto'>
          <div className='flex flex-col space-y-6'>
            <h2 className='text-center'>{data.title}</h2>
            <div className='flex justify-around'>
              <Button onClick={handleEditTodoModalOpen}>수정하기</Button>
              <Button onClick={handleDelete}>삭제하기</Button>
            </div>
            <div className='space-y-4'>
              {data.fileUrl && (
                <div className='flex space-x-2 cursor-pointer hover:underline' onClick={handleDownloadFile}>
                  <IconFile />
                  <p>파일 다운로드</p>
                </div>
              )}
              {data.linkUrl && (
                <div className='flex space-x-2 cursor-pointer hover:underline' onClick={handleLinkUrl}>
                  <IconLink />
                  <p>링크 들어가기</p>
                </div>
              )}
              {data.noteId && (
                <div className='flex space-x-2 cursor-pointer hover:underline' onClick={handleNoteView}>
                  <IconNoteView />
                  <p>노트 보기</p>
                </div>
              )}
              {data.noteId && (
                <div className='flex space-x-2 cursor-pointer hover:underline' onClick={handleNoteEdit}>
                  <IconNoteWrite />
                  <p>노트 수정하기</p>
                </div>
              )}
              {!data.noteId && (
                <div className='flex space-x-2 cursor-pointer hover:underline' onClick={handleNoteWrite}>
                  <IconNoteWrite />
                  <p>노트 추가하기</p>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </SheetProvider>
      <TodoEditModal isOpen={isEditTodoModalOpen} onChangeIsOpen={setIsEditTodoModalOpen} data={data} />
      <NoteViewSheet
        isSheetOpen={isNoteViewOpen}
        handleSheetOpen={setIsNoteViewOpen}
        noteId={data.noteId}
        goal={data.goal}
        todoTitle={data.title}
      />
    </>
  );
};

export default TodoContentsDrawer;
