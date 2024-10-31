'use client';
import { IconFlagSmall } from '@/public/icons/IconFlagSmall';
import useInfiniteGoalsQuery from '@/lib/hooks/useInfiniteGoalsQuery';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Goal } from '@/lib/types';
import Link from 'next/link';
import { useAddGoalMutation } from '@/lib/hooks/useAddGoalMutation';
import InputSlid from '../common/InputSlid';
import AddGoalButton from './AddGoalButton';
import clsx from 'clsx';

const NavGoal = () => {
  const [isGoalInputVisible, setIsGoalInputVisible] = useState(false);
  const [goalInputValue, setGoalInputValue] = useState('');
  const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null);

  const addGoal = useAddGoalMutation();

  const { ref, inView } = useInView({ threshold: 0.9 });
  const { data, fetchNextPage } = useInfiniteGoalsQuery(20);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const handleGoalClick = (goalId: number) => {
    console.log(goalId);
    setSelectedGoalId(goalId);
  };

  const handleAddGoalButtonClick = () => {
    setIsGoalInputVisible(!isGoalInputVisible);
    setGoalInputValue('· ');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // 유저가 `·` 기호를 지우지 못하게 항상 앞에 추가
    if (!inputValue.startsWith('· ')) {
      setGoalInputValue(`· ${inputValue.replace(/^·\s*/, '')}`);
    } else {
      setGoalInputValue(inputValue);
    }
  };

  const handleGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGoal.mutate({ updates: { title: goalInputValue.slice(1) } });
    setIsGoalInputVisible(false);
    setGoalInputValue('· ');
  };

  return (
    <div className='flex flex-wrap px-4 py-6 gap-4'>
      <div className='flex items-center gap-2 order-1 sm:order-1 lg:order-1'>
        <div className='w-6 h-6 flex justify-center items-center'>
          <IconFlagSmall />
        </div>
        <div className='text-lg font-medium text-slate-800'>목표</div>
      </div>

      {/* 새 목표 버튼 (모바일에서는 타이틀 옆, 태블릿과 데스크탑에서는 맨 아래로) */}
      <AddGoalButton
        className='order-2 sm:order-4 lg:order-4 ml-auto sm:ml-0 lg:ml-0 gap-[2px] rounded-xl text-sm px-3 py-2 sm:p-3 lg:p-3 sm:px-6 lg:px-6 mt-0 w-[84px] sm:w-full lg:w-full'
        onClick={handleAddGoalButtonClick}
      />

      <div className='order-3 sm:order-2 lg:order-2 w-full overflow-y-auto h-auto'>
        {data?.pages.map((page, idx) => (
          <div key={page.nextCursor || idx} className='flex-col'>
            {page.goals.map((goal: Goal) => (
              <Link
                href={`/goals/${goal.id}`}
                key={goal.id}
                className={clsx(
                  'flex text-slate-700 text-sm font-medium rounded-lg p-2 hover:bg-slate-50',
                  goal.id === selectedGoalId ? 'bg-slate-50' : 'bg-white'
                )}
                onClick={() => handleGoalClick(goal.id)}
              >
                {`· ${goal.title}`}
              </Link>
            ))}
          </div>
        ))}
        <div ref={ref}></div>
      </div>

      {/* 새 목표 클릭시 생성되는 인풋 */}
      {isGoalInputVisible && (
        <div className='order-4 sm:order-3 lg:order-3 w-full flex items-center mt-4'>
          <form onSubmit={handleGoalSubmit} className='w-full h-auto'>
            <InputSlid
              type='text'
              inputClassName='flex-grow p-2 text-sm font-medium bg-white rounded-lg'
              value={goalInputValue}
              onChange={handleInputChange}
              autoFocus
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default NavGoal;
