'use client';

import TodoItem from '../common/todoItem';
import { useSearchParams } from 'next/navigation';
import { useTodoContext } from './TodosContext';
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver';
import { useEffect } from 'react';
import { useTodosInfiniteQuery } from '@/lib/hooks/useTodosInfiniteQuery';

const AllTodoList: React.FC = () => {
  const { setTotalCount } = useTodoContext();
  const params = useSearchParams();
  const status = params.get('status');
  const { data, fetchNextPage, hasNextPage, isFetching } = useTodosInfiniteQuery({
    size: 40,
    done: status === 'completed' ? true : status === 'in-progress' ? false : undefined,
  });
  const loadMoreRef = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage && !isFetching,
    threshold: 0.5,
    rootMargin: '100px',
  });
  const todos = data?.pages.flatMap((page) => page.todos) ?? [];
  useEffect(() => {
    if (data?.pages[0]?.totalCount) {
      setTotalCount(data.pages[0].totalCount);
    }
  }, [data?.pages, setTotalCount]);

  if (!todos.length && !isFetching) {
    return <div className='flex justify-center items-center text-sm text-slate-500'>등록한 일이 없어요</div>;
  }

  return (
    <>
      <div>
        <ul className='flex flex-col gap-y-2'>
          {todos.map((todo) => (
            <li key={todo.id}>
              <TodoItem data={todo} viewGoal />
            </li>
          ))}
        </ul>
      </div>
      <div ref={loadMoreRef} className='h-10 flex items-center justify-center'>
        {isFetching && <div>불러오는 중...</div>}
      </div>
    </>
  );
};

export default AllTodoList;
