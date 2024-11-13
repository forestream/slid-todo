import Filters from './Filters';
import AllTodoList from './AllTodoList';

const TodosContent = () => {
  return (
    <>
      <section className='sm:p-6 p-4 bg-white rounded-xl flex flex-col gap-4'>
        <Filters />
        <AllTodoList />
      </section>
    </>
  );
};

export default TodosContent;
