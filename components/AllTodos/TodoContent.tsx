'use client';

import { IconPlusSmall } from '@/public/icons/IconPlusSmall';
import Button from '../common/ButtonSlid';
import PageHeader from '../common/PageLayout/PageHeader';
import Filters from './Filters';
import AllTodoList from './AllTodoList';
import { useSearchParams } from 'next/navigation';
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver';
import { useTodosInfiniteQuery } from '@/lib/hooks/useTodosInfiniteQuery';
import { useQueryClient } from '@tanstack/react-query';

const TodoContent = () => {
  const client = useQueryClient();

  const params = useSearchParams();
  const status = params.get('status');
  console.log('랜더링됨 ');
  const { isSuccess, data, fetchNextPage, hasNextPage, isFetching, isLoading } = useTodosInfiniteQuery({
    size: 20,
    done: status === 'completed' ? true : status === 'in-progress' ? false : undefined,
  });
  console.log('석세스', isSuccess);
  console.log('클라이언트 todo컨텐츠', client.getQueriesData({ predicate: (query) => query.queryKey[0] === 'todos' }));
  const loadMoreRef = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage && !isFetching,
    threshold: 0.5,
    rootMargin: '100px',
  });

  const todos = data?.pages.flatMap((page) => page.todos) ?? [];
  const totalCount = data?.pages[0]?.totalCount ?? 0;
  console.log('todos', todos);
  if (isLoading) {
    return <div>불러오는 중...</div>;
  }

  return (
    <>
      <PageHeader title={`모든 할 일 (${totalCount})`}>
        <Button className='border-none gap-1 p-0 active:bg-none' variant='outlined'>
          <IconPlusSmall stroke='#3B82F6' />
          할일 추가
        </Button>
      </PageHeader>
      <div className='sm:p-6 p-4 bg-white rounded-xl flex flex-col gap-4'>
        <Filters />
        <AllTodoList todos={todos} />
        <div ref={loadMoreRef} className='h-10 flex items-center justify-center'>
          {isFetching && <div>불러오는 중...</div>}
        </div>
      </div>
    </>
  );
};

export default TodoContent;
