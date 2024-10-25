'use client';
import TodoItem from '../common/TodoItem';
import useTodosQuery from '@/lib/hooks/useTodosQuery';
import { Goal } from '@/lib/types';
import { IconPlusSmall } from '@/public/icons/IconPlusSmall';
import Button from '../common/ButtonSlid';
import { IconArrowDown2 } from '@/public/icons/IconArrowDown2';

const GoalTodoCard = ({ goal }: { goal: Goal }) => {
  const todos = useTodosQuery(`${goal.id}-todos`, { goalId: goal.id, done: false, size: 5 }).data;
  const dones = useTodosQuery(`${goal.id}-dones`, { goalId: goal.id, done: true, size: 5 }).data;

  return (
    <div className='w-full flex-col justify-center'>
      <div className='flex justify-between'>
        <p className='text-lg font-bold'>{goal.title || '목표이름'}</p>
        <button className='flex gap-1 items-center text-blue-500'>
          <IconPlusSmall stroke='#3b82f6' />
          <span>할일추가</span>
        </button>
      </div>
      <div className='my-2 w-full'>progress bar</div>
      <div className='flex gap-3'>
        <div className='w-full flex-col'>
          <p className='bold text-sm font-semibold'>To do</p>
          {todos?.todos.map((todo) => (
            <TodoItem data={todo} key={todo.id} />
          ))}
        </div>
        <div className='w-full flex-col'>
          <p className='bold text-sm font-semibold'>Done</p>
          {dones?.todos.map((todo) => (
            <TodoItem data={todo} key={todo.id} />
          ))}
        </div>
      </div>
      <div className='w-full flex justify-center pt-4'>
        <Button
          className='flex border-none gap-[2px] bg-white text-slate-700 hover:bg-blue-100
        text-sm font-semibold rounded-2xl w-[120px] h-8 justify-center items-center'
        >
          <span>더보기</span>
          <IconArrowDown2 />
        </Button>
      </div>
    </div>
  );
};

export default GoalTodoCard;
