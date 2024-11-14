import { GoalInTodo } from '@/lib/types/todo';
import IconGoal from '@/public/icons/IconGoal';
import Link from 'next/link';

const GoalTitle = ({ goal }: { goal: GoalInTodo }) => {
  return (
    <Link href={`/goals/${goal.id}`} className='group flex gap-x-1.5 hover:text-link items-center w-fit'>
      <IconGoal circleClassName='group-hover:fill-slate-200' />
      <span className='truncate'>{goal.title}</span>
    </Link>
  );
};

export default GoalTitle;
