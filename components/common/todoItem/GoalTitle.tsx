import { GoalInTodo } from '@/lib/types/todo';
import IconGoal from '@/public/icons/IconGoal';
import Link from 'next/link';

const GoalTitle = ({ goal }: { goal: GoalInTodo }) => {
  return (
    <Link href={`/goals/${goal.id}`}>
      <div className='group flex gap-x-1.5 ml-8 cursor-pointer hover:text-link items-center'>
        <IconGoal circleClassName='group-hover:fill-slate-200' />
        <div className='truncate'>{goal.title}</div>
      </div>
    </Link>
  );
};

export default GoalTitle;
