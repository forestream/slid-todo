import { GoalInTodo } from '@/lib/types/todo';
import IconGoal from '@/public/icons/IconGoal';
import Link from 'next/link';

const GoalTitle = ({ goal }: { goal: GoalInTodo }) => {
  return (
    <Link href={`/goals/${goal.id}`}>
      <div className='flex gap-x-1.5 ml-8 cursor-pointer hover:text-link'>
        <IconGoal />
        <div className='truncate'>{goal.title}</div>
      </div>
    </Link>
  );
};

export default GoalTitle;
