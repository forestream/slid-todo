import { GoalInTodo } from '@/lib/types/todo';
import IconGoal from '@/public/icons/IconGoal';

const GoalTitle = ({ goal }: { goal: GoalInTodo }) => {
  return (
    <div className='flex gap-x-1.5 ml-8 cursor-pointer hover:text-link'>
      <IconGoal />
      <div className='truncate'>{goal.title}</div>
    </div>
  );
};

export default GoalTitle;
