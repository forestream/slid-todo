'use client';
import useTodosQuery from '@/lib/hooks/useTodosQuery';
import TodoItem from '.';
import clsx from 'clsx';
import { IconPlusSmall } from '@/public/icons/IconPlusSmall';

const TodoDoneItems = ({ goalId, path }: { goalId: number; path?: string }) => {
  const todos = useTodosQuery(`${goalId}-todos`, { goalId: goalId, done: false, size: 5 }).data;
  const dones = useTodosQuery(`${goalId}-dones`, { goalId: goalId, done: true, size: 5 }).data;

  const baseClass = 'w-full h-auto flex flex-col min-h-[228px] gap-3';
  const todoContainerClass = clsx(baseClass, path === 'goalDetail' && 'p-4 bg-white rounded-lg');
  const doneContainerClass = clsx(baseClass, path === 'goalDetail' && 'p-4 bg-slate-200 rounded-lg');

  const contentClass = clsx(
    'w-full flex',
    todos?.totalCount === 0
      ? 'h-full flex-col sm:flex-col lg:flex-row justify-center items-center'
      : 'h-auto flex-col gap-2'
  );

  return (
    <div className='w-full h-full lg:h-auto flex flex-col sm:flex-col lg:flex-row gap-6'>
      <div className={todoContainerClass}>
        <div className='flex w-full justify-between'>
          <p className='bold text-sm font-semibold'>To do</p>
          {path === 'goalDetail' && (
            <button className='flex gap-1 items-center text-blue-500'>
              <IconPlusSmall stroke='#3b82f6' />
              <span>할일 추가</span>
            </button>
          )}
        </div>
        <div className={contentClass}>
          {todos?.totalCount === 0 ? (
            <span className='text-sm text-center font-normal text-slate-500'>해야할 일이 아직 없어요</span>
          ) : (
            todos?.todos.map((todo) => <TodoItem data={todo} key={todo.id} />)
          )}
        </div>
      </div>
      <div className={doneContainerClass}>
        <p className='bold text-sm font-semibold'>Done</p>
        <div className={contentClass}>
          {dones?.totalCount === 0 ? (
            <span className='text-sm text-center font-normal text-slate-500'>다 한 일이 아직 없어요</span>
          ) : (
            dones?.todos.map((todo) => <TodoItem data={todo} key={todo.id} />)
          )}
        </div>
      </div>
    </div>
  );
};
export default TodoDoneItems;
