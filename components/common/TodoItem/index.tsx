'use client';

import TodoIcon from './TodoIcon';
import GoalTitle from './GoalTitle';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import CheckIcon from './CheckIcon';
import { Todo } from '@/lib/types/todos';

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
          <div className={twMerge(clsx('truncate hover:underline cursor-pointer', data.done && 'line-through'))}>
            {data.title}
          </div>
        </div>
        <div className='transition-all duration-200 w-0 group-hover:w-auto group-focus-within:w-auto'>
          <TodoIcon data={data} />
        </div>
      </div>
      {viewGoal && data.goal?.id && <GoalTitle goal={data.goal} />}
    </div>
  );
};

export default TodoItem;
