'use client';
import { IconDashboardFlag } from '@/public/icons/IconDashboardFlag';
import GoalTodoCard from './GoalTodoCard';
import useInfiniteGoalsQuery from '@/lib/hooks/useInfiniteGoalsQuery';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { Goal } from '@/lib/types';

const GoalTodo = () => {
  const { ref, inView } = useInView({ threshold: 0.9 });
  const { data, fetchNextPage } = useInfiniteGoalsQuery(3);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <section className='flex mt-6'>
      <div className='flex-col px-6 py-4 w-[344px] sm:w-[637px] lg:w-[1200px] h-auto min-h-[768px] bg-white rounded-xl border border-slate-100'>
        <div className='flex items-center w-full gap-2'>
          <div className='w-10 h-10 bg-orange-500 rounded-[15px] grid place-content-center'>
            <IconDashboardFlag />
          </div>
          <p className='text-slate-800 text-lg font-semibold'>목표 별 할 일</p>
        </div>
        <div className='flex-col mt-6 space-y-4'>
          {data?.pages.map((page, idx) => (
            <div key={page.nextCursor || idx} className='flex-col mt-6 space-y-4'>
              {page.goals.map((goal: Goal) => (
                <div
                  key={goal.id}
                  className='flex w-full min-h-[352px] h-auto p-6 bg-blue-50 rounded-[32px] hover:cursor-pointer'
                >
                  <GoalTodoCard goal={goal} />
                </div>
              ))}
            </div>
          ))}
          <div ref={ref}></div>
        </div>
      </div>
    </section>
  );
};

export default GoalTodo;
