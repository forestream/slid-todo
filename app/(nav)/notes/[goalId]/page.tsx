import PageContainer from '@/components/common/pageLayout/PageContainer';
import PageHeader from '@/components/common/pageLayout/PageHeader';
import NotesContent from '@/components/notes/NotesContent';
import baseFetch from '@/lib/api/baseFetch';
import { GetNotesResponse, Goal } from '@/lib/types/todo';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export default async function Notes({ params }: { params: { goalId: string } }) {
  const accessToken = cookies().get('accessToken');
  const goalData: Goal = await baseFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/goals/${params.goalId}`, {
    headers: { Authorization: `Bearer ${accessToken?.value}` },
    cache: 'no-store',
  });
  if (!goalData) {
    notFound();
  }
  const notesInitialData: GetNotesResponse = await baseFetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/notes?goalId=${params.goalId}`,
    {
      headers: { Authorization: `Bearer ${accessToken?.value}` },
      cache: 'no-store',
    }
  );

  return (
    <PageContainer>
      <PageHeader title='노트 모아보기' />
      <NotesContent goalData={goalData} goalId={params.goalId} notesInitialData={notesInitialData} />
    </PageContainer>
  );
}
