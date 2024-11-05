'use client';
import clsx from 'clsx';
import { useTodosInfiniteQuery } from '@/lib/hooks/useTodosInfiniteQuery';
import { IconArrowDown2 } from '@/public/icons/IconArrowDown2';
import { useMemo } from 'react';
import { Todo } from '@/lib/types/todo';
import TodoItem from '../common/todoItem';
import Button from '../common/ButtonSlid';

const TODO_SECTIONS = [
  { title: 'To do', emptyMessage: '해야할 일이 아직 없어요' },
  { title: 'Done', emptyMessage: '다 한 일이 아직 없어요' },
] as const;

const TodoItemsDashboard = ({ goalId }: { goalId: number }) => {
  const todoQuery = useTodosInfiniteQuery({ goalId, done: false, size: 5 });
  const doneQuery = useTodosInfiniteQuery({ goalId, done: true, size: 5 });
  const queries = useMemo(() => [todoQuery, doneQuery], [todoQuery, doneQuery]);

  const handleMoreClick = () => {
    queries.forEach(({ fetchNextPage, hasNextPage }) => {
      if (hasNextPage) {
        fetchNextPage();
      }
    });
  };

  // todo, done 중 하나라도 hasNextPage가 있으면 표시.
  const isMoreButtonVisible = useMemo(() => queries.some((query) => query.hasNextPage), [queries]);

  const containerClass = 'w-full h-auto flex flex-col min-h-[184px] gap-3 rounded-lg';
  const contentClass = (isEmpty: boolean) =>
    clsx(
      'w-full flex',
      isEmpty ? 'h-full flex-col sm:flex-col lg:flex-row justify-center items-center' : 'h-auto flex-col gap-2'
    );

  const todoLists = TODO_SECTIONS.map((section, index) => {
    const { data } = queries[index];
    const isEmpty = data?.pages[0]?.todos.length === 0;

    return (
      <div key={section.title} className={containerClass}>
        <div className='flex w-full justify-between'>
          <p className='bold text-sm font-semibold'>{section.title}</p>
        </div>

        <div className={contentClass(isEmpty)}>
          {isEmpty ? (
            <span className='text-sm text-center font-normal text-slate-500'>{section.emptyMessage}</span>
          ) : (
            data?.pages.map((page) => (
              <ul key={page.nextCursor} className='space-y-2'>
                {page.todos.map((todo: Todo) => (
                  <li key={todo.id}>
                    <TodoItem data={todo} />
                  </li>
                ))}
              </ul>
            ))
          )}
        </div>
      </div>
    );
  });

  return (
    <div className='flex flex-col w-full gap-4'>
      <div className='w-full h-auto flex flex-col sm:flex-col lg:flex-row gap-6'>{todoLists}</div>
      {isMoreButtonVisible && (
        <div className='w-full flex justify-center'>
          <Button
            onClick={handleMoreClick}
            className='flex border-none gap-[2px] bg-white text-slate-700 hover:bg-blue-100
            text-sm font-semibold rounded-2xl w-[120px] h-8 justify-center items-center'
          >
            <span>더보기</span>
            <IconArrowDown2 />
          </Button>
        </div>
      )}
    </div>
  );
};

export default TodoItemsDashboard;
