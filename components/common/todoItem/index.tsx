'use client';

import { memo, useEffect, useState } from 'react';
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
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (variant === 'detailed' && isValidImageUrl(data.fileUrl)) {
      setImageUrl(data.fileUrl);
    } else {
      setImageUrl(null);
    }
  }, [data.fileUrl, variant]);

  const layoutClasses = {
    article: twMerge(
      'text-sm grid gap-x-2 items-center',
      variant === 'default' ? 'grid-cols-[auto_1fr_auto]' : 'grid-cols-[auto_1fr_auto_auto]'
    ),
    checkIcon: 'row-start-1 col-start-1 h-6',
    title: twMerge('row-start-1 col-start-2 line-clamp-1'),
    goal: twMerge('row-start-2 col-start-2', variant === 'detailed' && 'row-start-2 col-start-2'),
    todoIcon: twMerge('row-start-1 col-start-3', variant === 'detailed' && 'col-start-4'),
    image: 'row-start-3 col-span-full w-full mt-2',
  };

  return (
    <article className={layoutClasses.article} aria-label={`todo-${data.title}`}>
      <div className={layoutClasses.checkIcon}>
        <CheckIcon done={data.done} id={data.id} />
      </div>
      <div className={layoutClasses.title}>
        <TodoTitle data={data} variant={variant} />
      </div>
      {viewGoal && data.goal?.id && (
        <div className={layoutClasses.goal}>
          <GoalTitle goal={data.goal} />
        </div>
      )}
      <div className={layoutClasses.todoIcon}>
        <TodoIcon data={data} />
      </div>
      {imageUrl && variant === 'detailed' && (
        <div className={layoutClasses.image}>
          <TodoImage imageUrl={imageUrl} />
        </div>
      )}
    </article>
  );
}, areEqual);

TodoItem.displayName = 'TodoItem';

export default TodoItem;
