'use client';

import { useState } from 'react';
import LinkEmbed from './LinkEmbed';
import IconModalClose from '@/public/icons/IconModalClose';
import NoteFormContent from './NoteFormContent';

type NoteFormProps = {
  title?: string;
  content?: string;
  linkUrl?: string;
  method?: 'POST' | 'PATCH';
  noteId?: string;
};

const NoteForm = ({
  title: initTitle = '',
  content: initContent = '',
  linkUrl: initLinkUrl = '',
  method = 'POST',
  noteId,
}: NoteFormProps) => {
  const [linkUrl, setLinkUrl] = useState(initLinkUrl);
  const [isEmbedOpen, setIsEmbedOpen] = useState(false);

  const handleSaveLinkUrl = (linkUrlValue: string) => setLinkUrl(linkUrlValue);

  const handleOpenEmbed = () => setIsEmbedOpen(true);
  const handleCloseEmbed = () => setIsEmbedOpen(false);

  return (
    <>
      {linkUrl && isEmbedOpen && (
        <section className='max-h-[385px] md:max-h-[522px] lg:max-h-none h-full w-full lg:w-[543px] overflow-auto relative'>
          <div className='absolute top-0 w-full h-10 flex justify-end items-center bg-white'>
            <button className='mr-3' onClick={handleCloseEmbed}>
              <IconModalClose />
            </button>
          </div>
          <div className='h-full pt-10 bg-blue-50'>
            <LinkEmbed linkUrl={linkUrl} />
          </div>
        </section>
      )}
      <NoteFormContent
        linkUrl={linkUrl}
        onSaveLinkUrl={handleSaveLinkUrl}
        initTitle={initTitle}
        initContent={initContent}
        method={method}
        noteId={noteId}
        onOpenEmbed={handleOpenEmbed}
      />
    </>
  );
};

export default NoteForm;
