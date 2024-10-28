'use client';
import IconFlag from '@/public/icons/IconFlag';
import DropdownMenu from '../DropdownMenu';
import ProgressBar from '../ProgressBar';
import useGoalQuery from '@/lib/hooks/useGoalQuery';
import useTodoProgressQuery from '@/lib/hooks/useTodoProgressQuery';
import { IconKebab } from '@/public/icons/IconKebab';

const GoalDetail = ({ goalId }: { goalId: number }) => {
  const { data: goal } = useGoalQuery(goalId);
  const progress = useTodoProgressQuery(goalId).data?.progress || 0;

  return (
    <div className='w-full bg-white rounded-xl px-6 py-4'>
      <div className='w-full flex items-center gap-2'>
        <div className='w-10 h-10 bg-slate-900 rounded-[15px] grid place-content-center'>
          <IconFlag />
        </div>
        <span className='text-lg font-semibold'>{goal?.title}</span>
        <div className='ml-auto'>
          <DropdownMenu icon={IconKebab} dropdownList={['수정하기', '삭제하기']} onItemClick={() => {}} />
        </div>
      </div>
      <div className='w-full flex-col mt-6'>
        <span className='text-xs font-semibold'>Progress</span>
        <ProgressBar percentage={progress} />
      </div>
    </div>
  );
};

export default GoalDetail;
