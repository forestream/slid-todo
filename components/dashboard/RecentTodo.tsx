'use client';

import IconArrowRight from '@/public/icons/IconArrowRight';
import { IconTodoRecently } from '@/public/icons/IconTodoRecently';
import TodoItem from '../common/todoItem';
import Link from 'next/link';
import { useTodosInfiniteQuery } from '@/lib/hooks/useTodosInfiniteQuery';

const RecentTodo = () => {
  const { data } = useTodosInfiniteQuery({ size: 4 }); // 4로 고정
  const recentTodos = data?.pages[0];
  return (
    <section
      className='flex flex-1 flex-col min-w-0 min-h-[250px] bg-white rounded-xl border border-slate-100 gap-4
      px-4 pb-6 pt-4 sm:px-6 sm:pb-6 sm:pt-4
    '
    >
      <div className='flex items-center w-full gap-2'>
        <div className='w-10 h-10 flex-shrink-0 bg-blue-500 rounded-[15px] grid place-content-center'>
          <IconTodoRecently />
        </div>
        <h2 className='text-slate-800 text-lg font-semibold text-nowrap'>최근 등록한 할 일</h2>
        <Link href='/todos' className='flex last:ml-auto text-slate-600 text-sm font-medium leading-tight text-nowrap'>
          <span className='flex items-center'>모두 보기</span>
          <IconArrowRight />
        </Link>
      </div>
      <div className='w-full h-full relative'>
        {recentTodos?.totalCount === 0 && (
          <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-slate-500'>
            최근에 등록한 할 일이 없어요
          </span>
        )}
        <ul className='flex flex-col gap-2'>
          {recentTodos?.todos.map((todo) => (
            <li key={todo.id}>
              <TodoItem data={todo} key={todo.id} viewGoal />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
export default RecentTodo;
