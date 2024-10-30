'use client';

import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { Todo } from '@/lib/types/todos';
import CheckIcon from './CheckIcon';
import TodoIcon from './TodoIcon';
import GoalTitle from './GoalTitle';
import { SheetClose, SheetContent, SheetProvider, SheetTrigger } from '../Sheet';
import NoteDetail from '@/components/notes/NoteDetail';

interface TodoItemProps {
  data: Todo;
  viewGoal?: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ data, viewGoal }) => {
  return (
    <SheetProvider>
      <div className='text-sm group'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-x-2 min-w-0 flex-1'>
            <CheckIcon done={data.done} id={data.id} />
            <SheetTrigger>
              <div className={twMerge(clsx('truncate hover:text-link cursor-pointer', data.done && 'line-through'))}>
                {data.title}
              </div>
            </SheetTrigger>
          </div>
          <div className='flex transition-all duration-200 group-hover:w-auto group-focus-within:w-auto'>
            <TodoIcon data={data} />
          </div>
        </div>
        {viewGoal && data.goal?.id && <GoalTitle goal={data.goal} />}
      </div>
      <SheetContent className='relative'>
        <div className='overflow-auto h-full'>
          <div className='flex justify-end mb-6'>
            <SheetClose />
          </div>
          <NoteDetail id={data.noteId} goalTitle={data.goal ? data.goal.title : ''} todoTitle={data.title} />
        </div>
      </SheetContent>
    </SheetProvider>
  );
};

export default TodoItem;
