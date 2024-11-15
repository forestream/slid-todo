import Filters from './Filters';
import AllTodoList from './AllTodoList';
import { GetTodosResponse } from '@/lib/types/todo';

interface TodosContentProps {
  TodosInitialData: GetTodosResponse;
}

const TodosContent: React.FC<TodosContentProps> = ({ TodosInitialData }) => {
  return (
    <>
      <section className='sm:p-6 p-4 bg-white rounded-xl flex flex-col gap-4'>
        <Filters />
        <AllTodoList TodosInitialData={TodosInitialData} />
      </section>
    </>
  );
};

export default TodosContent;
