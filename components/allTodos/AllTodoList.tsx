import { Todo } from '@/lib/types/todos';
import TodoItem from '../common/todoItem';

interface AllTodoListProps {
  todos: Todo[];
}

const AllTodoList: React.FC<AllTodoListProps> = ({ todos }) => {
  if (!todos.length) {
    return <div className='flex justify-center items-center text-sm text-slate-500'>등록한 일이 없어요</div>;
  }
  return (
    <div>
      <ul className='flex flex-col gap-y-2'>
        {todos.map((todo) => (
          <li key={todo.id}>
            <TodoItem data={todo} viewGoal />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllTodoList;
