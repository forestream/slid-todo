'use client';

import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { Todo } from '@/lib/types/todo';
import CheckIcon from './CheckIcon';
import TodoIcon from './TodoIcon';
import GoalTitle from './GoalTitle';

interface TodoItemProps {
  data: Todo;
  viewGoal?: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ data, viewGoal }) => {
  return (
    <div className='text-sm group'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-x-2 min-w-0 flex-1'>
          <CheckIcon done={data.done} id={data.id} />
          <div className={twMerge(clsx('truncate hover:text-link cursor-pointer', data.done && 'line-through'))}>
            {data.title}
          </div>
        </div>
        <div className='flex transition-all duration-200 group-hover:w-auto group-focus-within:w-auto'>
          <TodoIcon data={data} />
        </div>
      </div>
      {viewGoal && data.goal?.id && <GoalTitle goal={data.goal} />}
    </div>
  );
};

export default TodoItem;
