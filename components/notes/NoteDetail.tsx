import useNoteQuery from '@/lib/hooks/useNoteQuery';
import IconEmbed from '@/public/icons/IconEmbed';
import IconFlag from '@/public/icons/IconFlag';
import { useState } from 'react';
import IconModalClose from '@/public/icons/IconModalClose';
import TiptapEditorProvider from '../TiptapEditorProvider';

type NoteDetailProps = {
  id: number;
  goalTitle: string;
  todoTitle: string;
};

const NoteDetail = ({ id, goalTitle, todoTitle }: NoteDetailProps) => {
  const { data: note, isLoading } = useNoteQuery(id);
  const [isEmbedOpen, setIsEmbedOpen] = useState(false);

  const handleOpenEmbed = () => setIsEmbedOpen(true);
  const handleCloseEmbed = () => setIsEmbedOpen(false);

  if (isLoading) return;

  return (
    <>
      {note?.linkUrl && isEmbedOpen && (
        <section className='max-h-[385px] md:max-h-[522px] lg:max-h-none h-full w-full lg:w-[543px] overflow-auto relative'>
          <div className='absolute top-0 w-full h-10 flex justify-end items-center bg-white'>
            <button className='mr-3' onClick={handleCloseEmbed}>
              <IconModalClose />
            </button>
          </div>
          <div className='h-full pt-10 bg-blue-50'>
            <iframe src={note?.linkUrl} className='h-full w-full' />
          </div>
        </section>
      )}

      <section className='lg:max-w-[800px] w-full h-full p-4 md:p-6 lg:py-6 lg:px-10 flex flex-col grow '>
        <div className='flex w-full gap-1.5 mb-3'>
          <div className='flex justify-center items-center rounded-md bg-slate-800 w-6 h-6'>
            <IconFlag />
          </div>
          <p className='font-medium text-base text-slate-800'>{goalTitle}</p>
        </div>
        <div className='flex w-full gap-2 mb-6'>
          <p className='rounded-md bg-slate-100 p-1 text-slate-700 text-xs'>To do</p>
          <p className='text-sm font-normal text-slate-700'>{todoTitle}</p>
        </div>

        <hr />
        <form className='grow w-full relative flex flex-col'>
          <div className='w-full relative h-7 my-3'>
            <div className='w-full text-lg font-medium focus-visible:outline-none'>{note?.title}</div>
          </div>
          <hr />
          {note?.linkUrl && (
            <div className='w-full rounded-full bg-slate-200 p-1 flex items-center gap-2 mb-4'>
              <div className='w-6 h-6 rounded-full bg-blue-500 flex justify-center items-center'>
                <IconEmbed />
              </div>
              <p className='grow text-base font-normal text-slate-800 cursor-pointer' onClick={handleOpenEmbed}>
                {note?.linkUrl}
              </p>
            </div>
          )}
          <div className='grow lg:relative'>
            <div className='overflow-visible h-full'>
              <TiptapEditorProvider content={note?.content} editorOptions={{ editable: false }}></TiptapEditorProvider>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default NoteDetail;
