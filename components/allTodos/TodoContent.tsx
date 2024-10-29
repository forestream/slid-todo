'use client';

import { IconPlusSmall } from '@/public/icons/IconPlusSmall';
import Button from '../common/ButtonSlid';
import PageHeader from '../common/pageLayout/PageHeader';
import { useSearchParams } from 'next/navigation';
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver';
import { useTodosInfiniteQuery } from '@/lib/hooks/useTodosInfiniteQuery';
import { useRef } from 'react';
import TodoAddModal from '../modal/todoModal/TodoAddModal';
import Filters from './Filters';
import AllTodoList from './AllTodoList';

const TodoContent = () => {
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
  const totalCount = data?.pages[0]?.totalCount ?? 0;

  const modalRef = useRef<HTMLButtonElement>(null);
  const handleOpenModal = () => {
    modalRef.current?.click();
  };
  return (
    <>
      <PageHeader title={`모든 할 일 (${totalCount})`}>
        <Button onClick={handleOpenModal} className='border-none gap-1 p-0 active:bg-none' variant='outlined'>
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
      <TodoAddModal ref={modalRef} />
    </>
  );
};

export default TodoContent;
