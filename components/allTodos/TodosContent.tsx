import Filters from './Filters';
import AllTodoList from './AllTodoList';
import { Suspense } from 'react';

const TodosContent = () => {
  return (
    <>
      <div className='sm:p-6 p-4 bg-white rounded-xl flex flex-col gap-4'>
        <Suspense fallback={<div>필터 스켈레톤</div>}>
          <Filters />
        </Suspense>
        <Suspense fallback={<div>불러오는 중...</div>}>
          <AllTodoList />
        </Suspense>
      </div>
    </>
  );
};

export default TodosContent;
