import GoalTitleProgress from '@/components/common/GoalTitleWithProgress';
import PageContainer from '@/components/common/pageLayout/PageContainer';
import PageHeader from '@/components/common/pageLayout/PageHeader';
import TodoItemsGoal from '@/components/goals/TodoItemsGoal';
import IconArrowRight from '@/public/icons/IconArrowRight';
import IconNoteAll from '@/public/icons/IconNoteAll';
import Link from 'next/link';

export default function GoalDetailPage({ params }: { params: { goalId: string } }) {
  return (
    <PageContainer className={'max-w-[1200px] space-y-6'}>
      <div className='hidden sm:block lg:block'>
        <PageHeader title='목표' />
      </div>
      <article className='flex-col'>
        <GoalTitleProgress goalId={+params.goalId} />
      </article>
      <div className='bg-blue-100 rounded-xl'>
        <Link href={`/notes/${params.goalId}`} className='flex px-6 py-4 gap-2 items-center'>
          <IconNoteAll />
          <span className='text-lg font-bold text-slate-800'>노트 모아보기</span>
          <div className='ml-auto'>
            <IconArrowRight />
          </div>
        </Link>
      </div>
      <TodoItemsGoal goalId={+params.goalId} />
    </PageContainer>
  );
}
