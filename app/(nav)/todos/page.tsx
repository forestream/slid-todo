import TodoContent from '@/components/allTodos/TodoContent';
import PageContainer from '@/components/common/pageLayout/PageContainer';
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
