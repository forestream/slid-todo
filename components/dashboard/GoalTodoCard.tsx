'use client';
import { Goal } from '@/lib/types';
import { IconPlusSmall } from '@/public/icons/IconPlusSmall';
import Button from '../common/ButtonSlid';
import { IconArrowDown2 } from '@/public/icons/IconArrowDown2';
import ProgressBar from '../common/ProgressBar';
import useTodoProgressQuery from '@/lib/hooks/useTodoProgressQuery';
import TodoDoneItems from '../common/TodoItem/TodoDoneItems';
import Link from 'next/link';

const GoalTodoCard = ({ goal }: { goal: Goal }) => {
  // 진행률 요청
  const progress = useTodoProgressQuery(goal.id).data?.progress || 0;

  return (
    <div className='w-full h-[352px] flex-col justify-center'>
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
      <div className='overflow-y-auto'>
        <TodoDoneItems goalId={goal.id} />
      </div>
      <div className='w-full flex justify-center'>
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
