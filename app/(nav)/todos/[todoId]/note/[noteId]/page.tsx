import { cookies } from 'next/headers';
import NoteFormSections from '../../_view/NoteFormSections';
import { SingleNote } from '@/lib/types/todo';

export default async function Page({ params }: { params: { noteId: string } }) {
  const { noteId } = params;
  const accessToken = cookies().get('accessToken');

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/notes/${noteId}`, {
    headers: { Authorization: `Bearer ${accessToken?.value}` },
    cache: 'no-store',
  });
  const body: Partial<SingleNote> = await response.json();
  const { title, content, linkUrl } = body;

  return (
    <main className='lg:flex h-screen'>
      <NoteFormSections title={title} content={content} linkUrl={linkUrl ?? ''} method='PATCH' noteId={noteId} />
    </main>
  );
}
