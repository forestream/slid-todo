import { GoalInTodo } from '@/lib/types/todos';
import IconGoal from '@/public/icons/IconGoal';

const GoalTitle = ({ goal }: { goal: GoalInTodo }) => {
  return (
    <div className='flex gap-x-1.5 ml-8 cursor-pointer hover:underline'>
      <IconGoal />
      <div className='truncate'>{goal.title}</div>
    </div>
  );
};

export default GoalTitle;
