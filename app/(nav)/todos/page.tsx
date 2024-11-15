import TodosContent from '@/components/allTodos/TodosContent';
import { TodosProvider } from '@/components/allTodos/TodosContext';
import TodosHeader from '@/components/allTodos/TodosHeader';
import PageContainer from '@/components/common/pageLayout/PageContainer';
import baseFetch from '@/lib/api/baseFetch';
import { GetTodosResponse } from '@/lib/types/todo';
import { cookies } from 'next/headers';

export default async function Alltodos({ searchParams }: { searchParams: { status?: string } }) {
  const done = searchParams.status === 'completed' ? true : searchParams.status === 'in-progress' ? false : undefined;
  const accessToken = cookies().get('accessToken');
  const apiUrl = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/todos`);
  if (done !== undefined) {
    apiUrl.searchParams.set('done', done.toString());
  }

  const TodosInitialData: GetTodosResponse = await baseFetch(apiUrl.toString(), {
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
