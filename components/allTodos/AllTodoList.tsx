'use client';

import TodoItem from '../common/todoItem';
import { useSearchParams } from 'next/navigation';
import { useTodoContext } from './TodosContext';
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver';
import { useEffect } from 'react';
import { useTodosInfiniteQuery } from '@/lib/hooks/useTodosInfiniteQuery';
import Loading from '@/app/loading';
import { GetTodosResponse } from '@/lib/types/todo';

interface AllTodoListProps {
  TodosInitialData: GetTodosResponse;
}

const AllTodoList: React.FC<AllTodoListProps> = ({ TodosInitialData }) => {
  const { setTotalCount } = useTodoContext();
  const params = useSearchParams();
  const status = params.get('status');
  const { data, fetchNextPage, hasNextPage, isFetching } = useTodosInfiniteQuery(
    {
      size: 20,
      done: status === 'completed' ? true : status === 'in-progress' ? false : undefined,
    },
    {
      initialData: {
        pages: [TodosInitialData],
        pageParams: [null],
      },
    }
  );
  const loadMoreRef = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage && !isFetching,
    threshold: 0.1,
    rootMargin: '100px',
  });
  const todos = data?.pages.flatMap((page) => page.todos) ?? [];
  useEffect(() => {
    if (data?.pages[0]?.totalCount) {
      setTotalCount(data.pages[0].totalCount);
    }
  }, [data?.pages, setTotalCount]);

  if (!todos.length && !isFetching) {
    return (
      <div className='flex justify-center items-center text-sm text-slate-500 min-h-[50px]'>등록한 일이 없어요</div>
    );
  }

  return (
    <>
      <article>
        <ul className='flex flex-col gap-y-8' role='list' aria-label='할 일 목록'>
          {todos.map((todo) => (
            <li key={todo.id} role='listitem'>
              <TodoItem data={todo} viewGoal variant='detailed' />
            </li>
          ))}
        </ul>
      </article>
      <div ref={loadMoreRef} className='min-h-10 flex items-center justify-center'>
        {isFetching && <Loading />}
      </div>
    </>
  );
};

export default AllTodoList;
