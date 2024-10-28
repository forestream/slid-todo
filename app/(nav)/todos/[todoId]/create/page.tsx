import TiptapEditorProvider from '@/components/TiptapEditorProvider';
import NoteForm from '../_view/NoteForm';

export default function Page() {
  return (
    <main className='flex md:flex-col md:h-screen lg:flex-row w-full'>
      <TiptapEditorProvider
        className='resize-none w-full h-full focus-visible:outline-none text-slate-700 whitespace-break-spaces'
        slotBefore={<NoteForm />}
      />
    </main>
  );
}
