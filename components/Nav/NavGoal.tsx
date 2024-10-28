'use client';
import { IconFlagSmall } from '@/public/icons/IconFlagSmall';
import ButtonSlid from '../common/ButtonSlid';
import { IconPlusSmall } from '@/public/icons/IconPlusSmall';
import useInfiniteGoalsQuery from '@/lib/hooks/useInfiniteGoalsQuery';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Goal } from '@/lib/types';
import Link from 'next/link';

const NavGoal = () => {
  const { ref, inView } = useInView({ threshold: 0.9 });
  const { data, fetchNextPage } = useInfiniteGoalsQuery(20);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <div className='w-full h-fullflex-col'>
      <div className='w-full flex justify-between px-4 py-6 gap-2 text-nowrap'>
        <div className='w-6 h-6 flex justify-center items-center'>
          <IconFlagSmall />
        </div>
        <div className='flex-grow flex-col'>
          <div className='text-lg font-medium text-slate-800'>목표</div>
        </div>
      </div>

      <div className='flex-col overflow-y-auto h-auto pb-6'>
        {data?.pages.map((page, idx) => (
          <div key={page.nextCursor || idx} className='flex-col'>
            {page.goals.map((goal: Goal) => (
              <Link href={`/goals/${goal.title}`} key={goal.id} className='flex p-2 text-slate-700 text-sm font-medium'>
                {`· ${goal.title}`}
              </Link>
            ))}
          </div>
        ))}
        <div ref={ref}></div>
      </div>
      <div className='flex items-center sm:hidden lg:hidden mr-5'>
        <ButtonSlid variant='outlined' className='gap-[2px] rounded-xl text-sm w-[84px] px-3 py-2'>
          <IconPlusSmall stroke='#3B82F6' />
          <span>새 목표</span>
        </ButtonSlid>
      </div>
    </div>
  );
};
export default NavGoal;
