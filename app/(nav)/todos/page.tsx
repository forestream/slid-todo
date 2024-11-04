import TodosContent from '@/components/allTodos/TodosContent';
import { TodosProvider } from '@/components/allTodos/TodosContext';
import TodosHeader from '@/components/allTodos/TodosHeader';
import PageContainer from '@/components/common/pageLayout/PageContainer';

export default function Alltodos() {
  return (
    <PageContainer>
      <TodosProvider>
        <TodosHeader />
        <TodosContent />
      </TodosProvider>
    </PageContainer>
  );
}
