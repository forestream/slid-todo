'use client';
import PageContainer from '@/components/common/pageLayout/PageContainer';
import PageHeader from '@/components/common/pageLayout/PageHeader';
import GoalTodo from '@/components/dashboard/GoalTodo';
import Progress from '@/components/dashboard/Progress';
import RecentTodo from '@/components/dashboard/RecentTodo';

export default function DashboardPage() {
  return (
    <PageContainer className={'max-w-[1200px]'}>
      <div className='hidden sm:block lg:block'>
        <PageHeader title='대시보드' />
      </div>
      <div className='w-full flex flex-col sm:flex-row lg:flex-row gap-2 sm:gap-6 lg:gap-[27px]'>
        <RecentTodo />
        <Progress />
      </div>
      <GoalTodo />
    </PageContainer>
  );
}
