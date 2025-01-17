'use client';

import { memo, useState } from 'react';
import { Todo } from '@/lib/types/todo';
import CheckIcon from './CheckIcon';
import TodoIcon from './TodoIcon';
import GoalTitle from './GoalTitle';
import TodoTitle from './TodoTitle';
import isValidImageUrl from '@/lib/utils/isValidImageUrl';
import { twMerge } from 'tailwind-merge';
import TodoImage from './TodoImage';
import dynamic from 'next/dynamic';

const TodoContentsDrawer = dynamic(() => import('@/components/drawer/TodoContentsDrawer/TodoContentsDrawer'), {
  loading: () => null,
  ssr: false,
});

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
      'text-sm grid gap-x-2 items-start',
      variant === 'default' ? 'grid-cols-[auto_minmax(0,1fr)_auto]' : 'grid-cols-[auto_minmax(0,1fr)_auto_auto]'
    ),
    content: 'min-w-0 flex flex-col',
    checkIcon: 'row-start-1 col-start-1 h-6',
    title: 'min-w-0 line-clamp-1',
    goal: 'min-w-0',
    todoIcon: twMerge('row-start-1 col-start-3', variant === 'detailed' && 'col-start-4'),
    image: 'row-start-3 col-span-full w-full mt-2',
  };
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  return (
    <>
      <article className={layoutClasses.article} aria-label={`todo-${data.title}`}>
        <div className={layoutClasses.checkIcon}>
          <CheckIcon done={data.done} id={data.id} />
        </div>
        <div className={layoutClasses.content}>
          <div className={layoutClasses.title}>
            <TodoTitle data={data} variant={variant} setIsOpenDrawer={setIsOpenDrawer} />
          </div>
          {viewGoal && data.goal?.id && (
            <div className={layoutClasses.goal}>
              <GoalTitle goal={data.goal} />
            </div>
          )}
        </div>
        <div className={layoutClasses.todoIcon}>
          <TodoIcon data={data} setIsOpenDrawer={setIsOpenDrawer} />
        </div>
        {isValidImageUrl(data.fileUrl) && variant === 'detailed' && (
          <div className={layoutClasses.image}>
            <TodoImage imageUrl={data.fileUrl!} />
          </div>
        )}
      </article>
      {isOpenDrawer && <TodoContentsDrawer isOpen={isOpenDrawer} onChangeIsOpen={setIsOpenDrawer} data={data} />}
    </>
  );
}, areEqual);

TodoItem.displayName = 'TodoItem';

export default TodoItem;
