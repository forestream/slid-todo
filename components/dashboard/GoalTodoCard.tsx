'use client';
import { Goal } from '@/lib/types/todo';
import { IconPlusSmall } from '@/public/icons/IconPlusSmall';
import ProgressBar from '../common/ProgressBar';
import useTodoProgressQuery from '@/lib/hooks/useTodoProgressQuery';
import TodoItemsDashboard from './TodoItemsDashboard';
import Link from 'next/link';
import { useState } from 'react';
import TodoAddModal from '../modal/todoModal/TodoAddModal';
import IconArrowRight from '@/public/icons/IconArrowRight';

const GoalTodoCard = ({ goal }: { goal: Goal }) => {
  // 진행률 요청
  const progress = useTodoProgressQuery(goal.id).data?.progress || 0;
  const [isOpen, onChangeIsOpen] = useState(false);
  const handleOpenModal = () => {
    onChangeIsOpen(true);
  };

  return (
    <>
      <div className='w-full flex flex-col gap-4'>
        <div className=''>
          <div className='flex justify-between'>
            <Link
              className='flex items-center text-lg font-bold rounded-lg group'
              href={`/goals/${goal.id.toString()}`}
            >
              <h3>{goal.title || '목표이름'}</h3>
              <div className='group-hover:translate-x-1 transition-all' aria-hidden='true'>
                <IconArrowRight />
              </div>
            </Link>
            <button className='flex gap-1 items-center text-blue-500'>
              <IconPlusSmall stroke='#3b82f6' />
              <span className='text-nowrap' onClick={handleOpenModal}>
                할일 추가
              </span>
            </button>
          </div>
          <div className='my-2 w-full'>
            <ProgressBar percentage={progress} className='px-[9px]' />
          </div>
        </div>
        <TodoItemsDashboard goalId={goal.id} />
      </div>
      <TodoAddModal isOpen={isOpen} onChangeIsOpen={onChangeIsOpen} goalId={goal.id} />
    </>
  );
};

export default GoalTodoCard;
