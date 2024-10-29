import GoalTitleProgress from '@/components/common/GoalTitleWithProgress';
import TodoDoneItems from '@/components/goals/TodoItemsGoal';
import IconArrowRight from '@/public/icons/IconArrowRight';
import IconNoteAll from '@/public/icons/IconNoteAll';
import Link from 'next/link';

export default function GoalDetailPage({ params }: { params: { goalId: string } }) {
  return (
    <main className='w-full h-full bg-slate-100 pl-[78px] pt-6 overflow-y-auto'>
      <div className='w-full h-full max-w-[1200px] flex-col space-y-6'>
        <div className='text-slate-900 text-lg font-semibold'>목표</div>
        <article className='flex-col mt-4'>
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
        <TodoDoneItems goalId={+params.goalId} />
      </div>
    </main>
  );
}
