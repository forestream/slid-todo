import TiptapEditorProvider from '@/components/TiptapEditorProvider';
import LinkEmbed from '../_view/LinkEmbed';
import NoteForm from '../_view/NoteForm';

export default function Page() {
  return (
    <main className='flex md:flex-col md:h-screen lg:flex-row w-full'>
      <section className='lg:w-10 lg:h-screen'>
        <LinkEmbed />
      </section>
      <section className='max-w-[800px] w-full py-6 px-10 flex flex-col'>
        <TiptapEditorProvider
          className='resize-none w-full h-full focus-visible:outline-none text-slate-700 whitespace-break-spaces'
          slotBefore={<NoteForm />}
        />
      </section>
    </main>
  );
}
