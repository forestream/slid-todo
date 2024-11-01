'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import IconModalClose from '@/public/icons/IconModalClose';
import NoteFormContent, { SavedNote } from './NoteFormContent';
import TiptapEditorProvider from '@/components/TiptapEditorProvider';
import { useParams } from 'next/navigation';

type NoteFormProps = {
  title?: string;
  content?: string;
  linkUrl?: string;
  method?: 'POST' | 'PATCH';
  noteId?: string;
};

type NoteFormContentProps = {
  linkUrl?: string;
  initTitle?: string;
  method: 'POST' | 'PATCH';
  noteId?: string;
  openSavedToast: boolean;
  savedNote: SavedNote;
  savedToast: boolean;
  onSaveLinkUrl: (value: string) => void;
  onOpenEmbed: () => void;
  onOpenSaved: () => void;
  onChangeSavedToast: (status: boolean) => void;
  onChangeOpenSavedToast: (status: boolean) => void;
};

const NoteForm = ({
  title: initTitle = '',
  content: initContent = '',
  linkUrl: initLinkUrl = '',
  method = 'POST',
  noteId,
}: NoteFormProps) => {
  const { todoId } = useParams();
  const [linkUrl, setLinkUrl] = useState(initLinkUrl);
  const [isEmbedOpen, setIsEmbedOpen] = useState(false);
  const [content, setContent] = useState(initContent);
  const [title, setTitle] = useState(initTitle);
  const [openSavedToast, setOpenSavedToast] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

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
    setTitle(savedNote.title.length ? savedNote.title : '제목없음');
    setLinkUrl(savedNote.linkUrl);
    handleChangeContent(savedNote.content);
    setOpenSavedToast(false);
  }, [savedNote]);

  const TiptapProviderOnContentChange = useCallback(
    ({
      linkUrl,
      initTitle,
      method,
      noteId,
      savedNote,
      savedToast,
      openSavedToast,
      onSaveLinkUrl,
      onOpenEmbed,
      onOpenSaved,
      onChangeSavedToast,
      onChangeOpenSavedToast,
    }: NoteFormContentProps) => {
      return (
        <TiptapEditorProvider
          className='resize-none w-full h-full focus-visible:outline-none text-slate-700 whitespace-break-spaces '
          content={content}
          slotBefore={
            <NoteFormContent
              linkUrl={linkUrl}
              initTitle={initTitle}
              method={method}
              noteId={noteId}
              savedNote={savedNote}
              savedToast={savedToast}
              openSavedToast={openSavedToast}
              onSaveLinkUrl={onSaveLinkUrl}
              onOpenEmbed={onOpenEmbed}
              onOpenSaved={onOpenSaved}
              onChangeSavedToast={onChangeSavedToast}
              onChangeOpenSavedToast={onChangeOpenSavedToast}
            />
          }
        />
      );
    },
    [content]
  );

  useEffect(() => {
    if (savedNote) setOpenSavedToast(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <iframe src={linkUrl} className='h-full w-full' />
          </div>
        </section>
      )}
      <TiptapProviderOnContentChange
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
    </>
  );
};

export default NoteForm;
