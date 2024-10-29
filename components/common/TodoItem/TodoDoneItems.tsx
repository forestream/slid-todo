'use client';
import clsx from 'clsx';
import { IconPlusSmall } from '@/public/icons/IconPlusSmall';
import { useInView } from 'react-intersection-observer';
import { useTodosInfiniteQuery } from '@/lib/hooks/useTodosInfiniteQuery';
import { useEffect } from 'react';
import TodoItem from '.';

const TodoDoneItems = ({ goalId, path }: { goalId: number; path?: string }) => {
  const todoRef = useInView({ threshold: 1 });
  const doneRef = useInView({ threshold: 1 });
  const views = [todoRef, doneRef];

  // todo, done을 배열에 담아 2회 반복
  const queries = [
    useTodosInfiniteQuery({ goalId: goalId, done: false, size: 5 }), // To do
    useTodosInfiniteQuery({ goalId: goalId, done: true, size: 5 }), // Done
  ];

  useEffect(() => {
    queries.forEach(({ fetchNextPage, hasNextPage, isFetchingNextPage }, index) => {
      const { inView } = views[index];
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
  }, [views, queries]);

  const baseContainerClasses = 'w-full h-auto flex flex-col min-h-[228px] max-h-[228px] lg:max-h-[456px] gap-3';
  const containerClasses = [
    clsx(baseContainerClasses, path === 'goalDetail' && 'p-4 bg-white rounded-lg'),
    clsx(baseContainerClasses, path === 'goalDetail' && 'p-4 bg-slate-200 rounded-lg'),
  ];

  const contentClass = (isEmpty: boolean) =>
    clsx(
      'w-full flex overflow-y-auto',
      isEmpty ? 'h-full flex-col sm:flex-col lg:flex-row justify-center items-center' : 'h-auto flex-col gap-2'
    );

  return (
    <div className='w-full h-full lg:h-auto flex flex-col sm:flex-col lg:flex-row gap-6'>
      {['To do', 'Done'].map((title, index) => {
        const { data } = queries[index];
        const { ref } = views[index];

        const isEmpty = (data?.pages || []).every((page) => page.todos.length === 0);

        return (
          <div key={title} className={containerClasses[index]}>
            <div className='flex w-full justify-between'>
              <p className='bold text-sm font-semibold'>{title}</p>
              {index === 0 && path === 'goalDetail' && (
                <button className='flex gap-1 items-center text-blue-500'>
                  <IconPlusSmall stroke='#3b82f6' />
                  <span>할일 추가</span>
                </button>
              )}
            </div>

            <div className={contentClass(isEmpty)}>
              {isEmpty ? (
                <span className='text-sm text-center font-normal text-slate-500'>
                  {index === 0 ? '해야할 일이 아직 없어요' : '다 한 일이 아직 없어요'}
                </span>
              ) : (
                data?.pages.map((page, pageIndex) => (
                  <div key={page.nextCursor || pageIndex} className='space-y-2'>
                    {page.todos.map((todo: any) => (
                      <TodoItem key={todo.id} data={todo} />
                    ))}
                  </div>
                ))
              )}
              <div ref={ref}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodoDoneItems;
