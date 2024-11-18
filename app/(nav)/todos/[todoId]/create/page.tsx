import NoteFormSections from '../_view/NoteFormSections';

export default function Page() {
  return (
    <main className='lg:flex h-[calc(100vh-3.5rem)] sm:h-screen overflow-auto'>
      <NoteFormSections />
    </main>
  );
}
