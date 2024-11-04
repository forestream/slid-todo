import PageContainer from '@/components/common/pageLayout/PageContainer';
import PageHeader from '@/components/common/pageLayout/PageHeader';
import NotesContent from '@/components/notes/NotesContent';

export default function Notes({ params }: { params: { goalId: string } }) {
  return (
    <PageContainer>
      <PageHeader title='노트 모아보기' />
      <NotesContent goalId={params.goalId} />
    </PageContainer>
  );
}
