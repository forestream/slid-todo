import Button from '@/components/common/ButtonSlid';
import { SheetContent, SheetProvider } from '@/components/common/Sheet';
import { useDeleteTodoMutation } from '@/lib/hooks/useDeleteTodoMutation';
import { Todo } from '@/lib/types/todo';
import { useState } from 'react';
import ActionButtons from './ActionButtons';
import TodoEditModal from '@/components/modal/todoModal/TodoEditModal';
import NoteViewSheet from '@/components/sheet/NoteViewSheet';
import ConfirmationModal from '@/components/modal/ConfirmationModal';

interface TodoContentsDrawerProps {
  isOpen: boolean;
  onChangeIsOpen: (isOpen: boolean) => void;
  data: Todo;
}

const TodoContentsDrawer: React.FC<TodoContentsDrawerProps> = ({ isOpen, onChangeIsOpen, data }) => {
  const [isNoteViewOpen, setIsNoteViewOpen] = useState(false);
  const [isEditTodoModalOpen, setIsEditTodoModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const deleteTodo = useDeleteTodoMutation();

  return (
    <>
      <SheetProvider isOpen={isOpen} onChangeIsOpen={onChangeIsOpen}>
        <SheetContent position='bottom' className='w-full h-auto'>
          <div className='flex flex-col space-y-6'>
            <h2 className='text-center'>{data.title}</h2>
            <div className='flex justify-around'>
              <Button onClick={() => setIsEditTodoModalOpen(true)}>수정하기</Button>
              <Button onClick={() => setIsConfirmationModalOpen(true)}>삭제하기</Button>
            </div>
            <ActionButtons data={data} onNoteView={() => setIsNoteViewOpen(true)} />
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
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onChangeIsOpen={setIsConfirmationModalOpen}
        onConfirm={() => deleteTodo.mutate({ todoId: data.id })}
        itemType='todo'
      />
    </>
  );
};

export default TodoContentsDrawer;
