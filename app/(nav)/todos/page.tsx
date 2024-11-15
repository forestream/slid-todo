import TodosContent from '@/components/allTodos/TodosContent';
import { TodosProvider } from '@/components/allTodos/TodosContext';
import TodosHeader from '@/components/allTodos/TodosHeader';
import PageContainer from '@/components/common/pageLayout/PageContainer';
import baseFetch from '@/lib/api/baseFetch';
import { GetTodosResponse } from '@/lib/types/todo';
import { cookies } from 'next/headers';

export default async function Alltodos() {
  const accessToken = cookies().get('accessToken');
  const TodosInitialData: GetTodosResponse = await baseFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/todos`, {
    headers: { Authorization: `Bearer ${accessToken?.value}` },
    cache: 'no-store',
  });
  return (
    <PageContainer>
      <TodosProvider>
        <TodosHeader />
        <TodosContent TodosInitialData={TodosInitialData} />
      </TodosProvider>
    </PageContainer>
  );
}
