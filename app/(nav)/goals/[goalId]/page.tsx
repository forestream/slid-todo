import GoalTitleProgress from '@/components/common/GoalTitleWithProgress';
import PageContainer from '@/components/common/pageLayout/PageContainer';
import PageHeader from '@/components/common/pageLayout/PageHeader';
import TodoItemsGoal from '@/components/goals/TodoItemsGoal';
import baseFetch from '@/lib/api/baseFetch';
import { Goal } from '@/lib/types/todo';
import IconArrowRight from '@/public/icons/IconArrowRight';
import IconNoteAll from '@/public/icons/IconNoteAll';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function GoalDetailPage({ params }: { params: { goalId: string } }) {
  const accessToken = cookies().get('accessToken');
  const initialGoal: Goal = await baseFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/goals/${params.goalId}`, {
    headers: { Authorization: `Bearer ${accessToken?.value}` },
    cache: 'no-store',
  });

  if (!initialGoal) {
    notFound();
  }

  return (
    <PageContainer className={'max-w-[1200px] flex flex-col gap-4'}>
      <div className='hidden sm:block lg:block'>
        <PageHeader title='목표' />
      </div>
      <article className='flex-col'>
        <GoalTitleProgress goalId={+params.goalId} initialGoal={initialGoal} />
      </article>
      <div className='bg-blue-100 rounded-xl'>
        <Link href={`/notes/${params.goalId}`} className='flex px-6 py-4 gap-2 items-center'>
          <div className='flex-shrink-0'>
            <IconNoteAll />
          </div>
          <span className='text-lg font-bold text-slate-800'>노트 모아보기</span>
          <div className='ml-auto'>
            <IconArrowRight />
          </div>
        </Link>
      </div>
      <div className='flex flex-col'>
        <TodoItemsGoal goalId={+params.goalId} />
      </div>
    </PageContainer>
  );
}
