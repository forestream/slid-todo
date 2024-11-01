'use client';
import PageContainer from '@/components/common/pageLayout/PageContainer';
import GoalTodo from '@/components/dashboard/GoalTodo';
import Progress from '@/components/dashboard/Progress';
import RecentTodo from '@/components/dashboard/RecentTodo';

export default function DashboardPage() {
  return (
    <PageContainer className={'max-w-[1200px]'}>
      <main className='w-full h-full'>
        <div className='text-slate-900 text-lg font-semibold'>대시보드</div>
        <article className='flex-col mt-4'>
          <div className='w-full flex flex-col sm:flex-row lg:flex-row gap-2 sm:gap-6 lg:gap-[27px]'>
            <RecentTodo />
            <Progress />
          </div>
          <GoalTodo />
        </article>
      </main>
    </PageContainer>
  );
}
