import { cookies } from 'next/headers';
import NoteForm from '../../_view/NoteForm';
import TiptapEditorProvider from '@/components/TiptapEditorProvider';

export default async function Page({ params }: { params: { noteId: string } }) {
  const { noteId } = params;
  const accessToken = cookies().get('accessToken');

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/notes/${noteId}`, {
    headers: { Authorization: `Bearer ${accessToken?.value}` },
    cache: 'no-store',
  });
  const body = await response.json();
  const { title, content, linkUrl } = body;

  return (
    <main className='lg:flex h-screen w-screen'>
      <TiptapEditorProvider
        className='resize-none w-full h-full focus-visible:outline-none text-slate-700 whitespace-break-spaces '
        content={content}
        slotBefore={<NoteForm title={title} content={content} linkUrl={linkUrl} method='PATCH' noteId={noteId} />}
      />
    </main>
  );
}
