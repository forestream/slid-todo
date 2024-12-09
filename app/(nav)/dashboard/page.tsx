import PageHeader from '@/components/common/pageLayout/PageHeader';
import GoalTodo from '@/components/dashboard/GoalTodo';
import Progress from '@/components/dashboard/Progress';
import RecentTodo from '@/components/dashboard/RecentTodo';

export default function DashboardPage() {
  return (
    <>
      <div className='hidden sm:block lg:block'>
        <PageHeader title='대시보드' />
      </div>
      <div className='w-full flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-6'>
        <RecentTodo />
        <Progress />
      </div>
      <GoalTodo />
    </>
  );
}
