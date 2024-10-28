import TiptapEditorProvider from '@/components/TiptapEditorProvider';
import NoteForm from '../_view/NoteForm';

export default function Page() {
  return (
    <main className='lg:flex h-screen w-screen'>
      <TiptapEditorProvider
        className='resize-none w-full h-full focus-visible:outline-none text-slate-700 whitespace-break-spaces'
        slotBefore={<NoteForm />}
      />
    </main>
  );
}
