'use client';

import { memo } from 'react';
import { Todo } from '@/lib/types/todo';
import CheckIcon from './CheckIcon';
import TodoIcon from './TodoIcon';
import GoalTitle from './GoalTitle';
import TodoTitle from './TodoTitle';

interface TodoItemProps {
  data: Todo;
  viewGoal?: boolean;
}

// 메모이제이션을 위한 비교 함수
const areEqual = (prevProps: TodoItemProps, nextProps: TodoItemProps) => {
  return (
    prevProps.data.id === nextProps.data.id &&
    prevProps.data.done === nextProps.data.done &&
    prevProps.data.title === nextProps.data.title &&
    prevProps.data.noteId === nextProps.data.noteId &&
    prevProps.data.fileUrl === nextProps.data.fileUrl &&
    prevProps.data.linkUrl === nextProps.data.linkUrl &&
    prevProps.viewGoal === nextProps.viewGoal &&
    prevProps.data.goal?.id === nextProps.data.goal?.id &&
    prevProps.data.goal?.title === nextProps.data.goal?.title
  );
};

const TodoItem: React.FC<TodoItemProps> = memo(({ data, viewGoal }) => {
  console.log('TodoItem render', data.id);
  return (
    <div className='text-sm'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-x-2 min-w-0 flex-1'>
          <CheckIcon done={data.done} id={data.id} />
          <TodoTitle data={data} />
        </div>
        <div className='flex'>
          <TodoIcon data={data} />
        </div>
      </div>
      {viewGoal && data.goal?.id && <GoalTitle goal={data.goal} />}
    </div>
  );
}, areEqual);

TodoItem.displayName = 'TodoItem';

export default TodoItem;
