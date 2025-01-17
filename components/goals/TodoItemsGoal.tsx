'use client';
import clsx from 'clsx';
import { IconPlusSmall } from '@/public/icons/IconPlusSmall';
import { useInView } from 'react-intersection-observer';
import { useTodosInfiniteQuery } from '@/lib/hooks/useTodosInfiniteQuery';
import { useEffect, useMemo, useState } from 'react';
import TodoItem from '../common/todoItem';
import { Todo } from '@/lib/types/todo';
import TodoAddModal from '../modal/todoModal/TodoAddModal';

const TODO_SECTIONS = [
  {
    title: 'To do',
    emptyMessage: '해야할 일이 아직 없어요',
    containerClass: 'bg-white rounded-lg',
    showAddTodo: true,
  },
  {
    title: 'Done',
    emptyMessage: '다 한 일이 아직 없어요',
    containerClass: 'bg-slate-200 rounded-lg',
    showAddTodo: false,
  },
] as const;

const TodoItemsGoal = ({ goalId }: { goalId: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const todoRef = useInView({ threshold: 1 });
  const doneRef = useInView({ threshold: 1 });
  const views = useMemo(() => [todoRef, doneRef], [todoRef, doneRef]);

  const todoQuery = useTodosInfiniteQuery({ goalId, done: false, size: 10 });
  const doneQuery = useTodosInfiniteQuery({ goalId, done: true, size: 10 });
  const queries = useMemo(() => [todoQuery, doneQuery], [todoQuery, doneQuery]);

  useEffect(() => {
    queries.forEach(({ fetchNextPage, hasNextPage, isFetchingNextPage }, index) => {
      const { inView } = views[index];
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
  }, [views, queries]);

  const baseContainerClasses = 'h-auto flex flex-col flex-1 p-4 gap-3';

  const contentClass = (isEmpty: boolean) =>
    clsx(
      'w-full flex overflow-y-auto min-h-[200px] max-h-[228px] lg:max-h-[456px]',
      isEmpty ? 'h-full flex flex-col sm:flex-col lg:flex-row justify-center items-center' : 'h-auto flex-col gap-2'
    );

  const todoLists = TODO_SECTIONS.map((section, index) => {
    const { data } = queries[index];
    const { ref } = views[index];
    const isEmpty = data?.pages[0]?.todos.length === 0;

    return (
      <section
        key={section.title}
        className={clsx(baseContainerClasses, section.containerClass)}
        role='region'
        aria-labelledby={`${section.title}-header`}
      >
        <div className='flex w-full justify-between'>
          <h4 id={`${section.title}-header`} className='bold text-sm font-semibold'>
            {section.title}
          </h4>
          {section.showAddTodo && (
            <button onClick={() => setIsModalOpen(true)} className='flex gap-1 items-center text-blue-500'>
              <IconPlusSmall stroke='#3b82f6' aria-hidden='true' />
              <span>할일 추가</span>
            </button>
          )}
        </div>

        <div className={contentClass(isEmpty)}>
          {isEmpty ? (
            <span className='text-sm text-center font-normal text-slate-500'>{section.emptyMessage}</span>
          ) : (
            data?.pages.map((page, idx) => (
              <ul key={page.nextCursor || idx} className='flex flex-col gap-2'>
                {page.todos.map((todo: Todo) => (
                  <li key={todo.id}>
                    <TodoItem data={todo} />
                  </li>
                ))}
              </ul>
            ))
          )}
          <div ref={ref}></div>
        </div>
      </section>
    );
  });

  return (
    <>
      <div className='w-full h-full lg:h-auto grid grid-cols-1 lg:grid-cols-2 gap-6'>{todoLists}</div>
      <TodoAddModal isOpen={isModalOpen} onChangeIsOpen={setIsModalOpen} goalId={goalId} />
    </>
  );
};

export default TodoItemsGoal;
