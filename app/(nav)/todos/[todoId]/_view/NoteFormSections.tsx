'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import IconModalClose from '@/public/icons/IconModalClose';
import NoteFormSection, { SavedNote } from './NoteFormSection';
import { useParams } from 'next/navigation';
import Link from 'next/link';

type NoteFormSectionsProps = {
  title?: string;
  content?: string;
  linkUrl?: string;
  method?: 'POST' | 'PATCH';
  noteId?: string;
};

const NoteFormSections = ({
  title: initTitle = '',
  content: initContent = '',
  linkUrl: initLinkUrl = '',
  method = 'POST',
  noteId,
}: NoteFormSectionsProps) => {
  const { todoId } = useParams();
  const [isEmbedOpen, setIsEmbedOpen] = useState(false);
  const [title, setTitle] = useState(initTitle);
  const [linkUrl, setLinkUrl] = useState(initLinkUrl);
  const [content, setContent] = useState(initContent);
  const [openSavedToast, setOpenSavedToast] = useState(false);
  const [savedToast, setSavedToast] = useState(false);
  const [linkUrlEmbeddable, setLinkUrlEmbeddable] = useState(true);

  const handleChangeOpenSavedToast = (status: boolean) => setOpenSavedToast(status);
  const handleChangeSavedToast = (status: boolean) => setSavedToast(status);
  const handleChangeContent = (newContent: string) => setContent(newContent);

  const handleSaveLinkUrl = useCallback((linkUrlValue: string) => setLinkUrl(linkUrlValue), []);

  const handleOpenEmbed = useCallback(() => setIsEmbedOpen(true), []);
  const handleCloseEmbed = () => setIsEmbedOpen(false);

  const savedNote = useMemo<SavedNote>(() => {
    if (!globalThis.window) return;
    const item = window.localStorage.getItem('savedNote' + todoId);
    return item && JSON.parse(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoId, savedToast]);

  const handleOpenSaved = useCallback(() => {
    if (!savedNote) return;
    setTitle(savedNote.title?.length ? savedNote.title : '제목없음');
    setLinkUrl(savedNote.linkUrl);
    handleChangeContent(savedNote.content);
    setOpenSavedToast(false);
  }, [savedNote]);

  useEffect(() => {
    if (savedNote) setOpenSavedToast(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await fetch(linkUrl, { method: 'HEAD' });
        setLinkUrlEmbeddable(true);
      } catch {
        setLinkUrlEmbeddable(false);
      }
    })();
  }, [linkUrl]);

  return (
    <>
      {linkUrl && isEmbedOpen && (
        <section className='max-h-[385px] md:max-h-[522px] lg:max-h-none h-full w-full lg:w-[543px] overflow-auto relative'>
          <div className='absolute top-0 w-full h-10 flex justify-end items-center bg-white'>
            <button className='mr-3' onClick={handleCloseEmbed}>
              <IconModalClose />
            </button>
          </div>
          <div className='h-full pt-10 bg-blue-50 flex flex-col justify-center items-center'>
            {linkUrlEmbeddable ? (
              <iframe src={linkUrl} className='h-full w-full' />
            ) : (
              <>
                <p>임베드할 수 없는 링크입니다.</p>
                <p>
                  <Link href={linkUrl} target='_blank' className='underline hover:opacity-70'>
                    {linkUrl}
                  </Link>
                  으로 이동
                </p>
              </>
            )}
          </div>
        </section>
      )}
      <section className='lg:max-w-[800px] w-full h-full p-4 md:p-6 lg:py-6 lg:px-10 flex flex-col grow'>
        <NoteFormSection
          content={content}
          linkUrl={linkUrl}
          initTitle={title}
          method={method}
          noteId={noteId}
          savedNote={savedNote}
          savedToast={savedToast}
          openSavedToast={openSavedToast}
          onSaveLinkUrl={handleSaveLinkUrl}
          onOpenEmbed={handleOpenEmbed}
          onOpenSaved={handleOpenSaved}
          onChangeSavedToast={handleChangeSavedToast}
          onChangeOpenSavedToast={handleChangeOpenSavedToast}
        />
      </section>
    </>
  );
};

export default NoteFormSections;
