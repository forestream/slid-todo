import { cookies } from 'next/headers';
import NoteFormSections from '../../_view/NoteFormSections';
import { SingleNote } from '@/lib/types/todo';
import baseFetch from '@/lib/api/baseFetch';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { noteId: string } }) {
  const { noteId } = params;
  const accessToken = cookies().get('accessToken');

  const response: Partial<SingleNote> = await baseFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/notes/${noteId}`, {
    headers: { Authorization: `Bearer ${accessToken?.value}` },
    cache: 'no-store',
  });

  if (!response) {
    notFound();
  }

  const { title, content, linkUrl } = response;
  return (
    <main className='lg:flex h-screen overflow-auto'>
      <NoteFormSections title={title} content={content} linkUrl={linkUrl ?? ''} method='PATCH' noteId={noteId} />
    </main>
  );
}
