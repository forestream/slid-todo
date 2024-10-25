import TodoContent from '@/components/AllTodos/TodoContent';
import PageContainer from '@/components/common/PageLayout/PageContainer';
import { Suspense } from 'react';

export default function Alltodos() {
  return (
    <PageContainer>
      <Suspense fallback={'불러오는 중...'}>
        <TodoContent />
      </Suspense>
    </PageContainer>
  );
}
