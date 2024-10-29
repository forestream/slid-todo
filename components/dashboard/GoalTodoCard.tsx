'use client';
import { Goal } from '@/lib/types';
import { IconPlusSmall } from '@/public/icons/IconPlusSmall';
import ProgressBar from '../common/ProgressBar';
import useTodoProgressQuery from '@/lib/hooks/useTodoProgressQuery';
import TodoItemsDashboard from './TodoItemsDashboard';
import Link from 'next/link';

const GoalTodoCard = ({ goal }: { goal: Goal }) => {
  // 진행률 요청
  const progress = useTodoProgressQuery(goal.id).data?.progress || 0;
  return (
    <div className='w-full flex flex-col gap-4'>
      <div className=''>
        <div className='flex justify-between'>
          <Link className='text-lg font-bold' href={`/goals/${goal.id.toString()}`}>
            {goal.title || '목표이름'}
          </Link>
          <button className='flex gap-1 items-center text-blue-500'>
            <IconPlusSmall stroke='#3b82f6' />
            <span>할일 추가</span>
          </button>
        </div>
        <div className='my-2 w-full'>
          <ProgressBar percentage={progress} className='px-[9px]' />
        </div>
      </div>
      <TodoItemsDashboard goalId={goal.id} />
    </div>
  );
};

export default GoalTodoCard;
