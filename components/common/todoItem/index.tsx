'use client';

import { memo } from 'react';
import { Todo } from '@/lib/types/todo';
import CheckIcon from './CheckIcon';
import TodoIcon from './TodoIcon';
import GoalTitle from './GoalTitle';
import TodoTitle from './TodoTitle';
import isValidImageUrl from '@/lib/utils/isValidImageUrl';
import { twMerge } from 'tailwind-merge';
import TodoImage from './TodoImage';

interface TodoItemProps {
  data: Todo;
  viewGoal?: boolean;
  variant?: 'default' | 'detailed';
}

const areEqual = (prevProps: TodoItemProps, nextProps: TodoItemProps) => {
  return (
    prevProps.data.id === nextProps.data.id &&
    prevProps.data.done === nextProps.data.done &&
    prevProps.data.title === nextProps.data.title &&
    prevProps.data.noteId === nextProps.data.noteId &&
    prevProps.data.fileUrl === nextProps.data.fileUrl &&
    prevProps.data.linkUrl === nextProps.data.linkUrl &&
    prevProps.viewGoal === nextProps.viewGoal &&
    prevProps.variant === nextProps.variant &&
    prevProps.data.goal?.id === nextProps.data.goal?.id &&
    prevProps.data.goal?.title === nextProps.data.goal?.title
  );
};

const TodoItem: React.FC<TodoItemProps> = memo(({ data, viewGoal, variant = 'default' }) => {
  const layoutClasses = {
    article: twMerge(
      'text-sm grid gap-x-2 items-start', // items-center를 items-start로 변경
      variant === 'default' ? 'grid-cols-[auto_minmax(0,1fr)_auto]' : 'grid-cols-[auto_minmax(0,1fr)_auto_auto]'
      // minmax(0,1fr)을 사용하여 자식 요소가 부모 컨테이너를 넘어가지 않도록 함
    ),
    content: 'min-w-0 flex flex-col gap-1', // 내용을 감싸는 컨테이너 추가
    checkIcon: 'row-start-1 col-start-1 h-6',
    title: 'min-w-0 line-clamp-1', // min-w-0 추가
    goal: 'min-w-0', // min-w-0 추가
    todoIcon: twMerge('row-start-1 col-start-3', variant === 'detailed' && 'col-start-4'),
    image: 'row-start-3 col-span-full w-full mt-2',
  };

  return (
    <article className={layoutClasses.article} aria-label={`todo-${data.title}`}>
      <div className={layoutClasses.checkIcon}>
        <CheckIcon done={data.done} id={data.id} />
      </div>
      <div className={layoutClasses.content}>
        <div className={layoutClasses.title}>
          <TodoTitle data={data} variant={variant} />
        </div>
        {viewGoal && data.goal?.id && (
          <div className={layoutClasses.goal}>
            <GoalTitle goal={data.goal} />
          </div>
        )}
      </div>
      <div className={layoutClasses.todoIcon}>
        <TodoIcon data={data} />
      </div>
      {isValidImageUrl(data.fileUrl) && variant === 'detailed' && (
        <div className={layoutClasses.image}>
          <TodoImage imageUrl={data.fileUrl!} />
        </div>
      )}
    </article>
  );
}, areEqual);

TodoItem.displayName = 'TodoItem';

export default TodoItem;
