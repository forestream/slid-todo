'use client';

import TiptapEditor from '@/components/TiptapEditor';
import IconClose from '@/public/icons/IconClose';
import IconEmbed from '@/public/icons/IconEmbed';
import IconFlag from '@/public/icons/IconFlag';
import { useParams, useSearchParams } from 'next/navigation';
import { PropsWithChildren, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import TiptapCharacterCount from './TiptapCharacterCount';
import IconCheck from '@/public/icons/IconCheck';
import OpenSavedNoteModal from './OpenSavedNoteModal';
import SecondsTimer from './SecondsTimer';
import AddLinkModal from './AddLinkModal';
import NoteFormTitleInput from './NoteFormTitleInput';
import NoteForm from './NoteForm';
import NoteFormEditorButtons from './NoteFormEditorButtons';
import Button from '@/components/common/ButtonSlid';
import TiptapEditorProvider from '@/components/TiptapEditorProvider';

export type SavedNote = {
  title: string;
  content: string;
  linkUrl: string;
} | null;

type NoteFormContentProps = {
  content?: string;
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

const NoteFormSection = ({
  content = '',
  linkUrl = '',
  initTitle = '',
  method = 'POST',
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
  const { todoId } = useParams();
  const searchParams = useSearchParams();
  const todoTitle = searchParams.get('todo');
  const goalTitle = searchParams.get('goal');
  const saveButtonRef = useRef<HTMLButtonElement | null>(null);

  const savedAt: string | undefined = useMemo(() => {
    if (!globalThis.window || !savedNote) return;
    const note = JSON.parse(window.localStorage.getItem('savedNote' + todoId) ?? '{}');
    return note.savedAt;
  }, [savedNote, todoId]);

  const handleCloseOpenSavedToast = () => {
    if (openSavedToast) {
      setTimeout(() => {
        if (!openSavedToastRef.current) return;
        openSavedToastRef.current.classList.remove('h-[82px]');
        openSavedToastRef.current.classList.add('h-0');
      }, 0);
    }

    setTimeout(() => {
      onChangeOpenSavedToast(false);
    }, 1000);
  };

  const [titleEmpty, setTitleEmpty] = useState(true);
  const [contentEmpty, setContentEmpty] = useState(true);
  const handleTitleEmpty = (empty: boolean) => setTitleEmpty(empty);

  useEffect(() => {
    setTitleEmpty(!initTitle);
    setContentEmpty(!content);
  }, [initTitle, content]);

  const TiptapProviderOnOpenSaved = useCallback(
    ({ className, slotBefore }: PropsWithChildren<{ className: string; slotBefore: ReactNode }>) => {
      return (
        <TiptapEditorProvider
          className={className}
          content={content}
          slotBefore={slotBefore}
          editorOptions={{ onUpdate: (event) => setContentEmpty(event.editor.isEmpty) }}
        />
      );
    },
    [content]
  );

  const handleDeleteLinkUrl = () => onSaveLinkUrl('');

  const savedToastRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (savedToast) {
      setTimeout(() => {
        if (!savedToastRef.current) return;
        savedToastRef.current.classList.remove('translate-y-full');
      }, 0);
      setTimeout(() => {
        if (!savedToastRef.current) return;
        savedToastRef.current.classList.add('translate-y-full');
      }, 1000 * 4);
    }
  }, [savedToast]);

  const openSavedToastRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (openSavedToast) {
      setTimeout(() => {
        if (!openSavedToastRef.current) return;
        openSavedToastRef.current.classList.remove('h-0');
        openSavedToastRef.current.classList.add('h-[82px]');
      }, 0);
    }
  }, [openSavedToast]);

  return (
    <NoteForm
      method={method}
      noteId={noteId}
      saveButtonRef={saveButtonRef}
      onChangeSavedToast={onChangeSavedToast}
      className='flex flex-col grow h-full'
    >
      <div className='flex w-full items-center mb-4'>
        <h1 className='grow text-slate-900 font-semibold text-lg'>노트 작성</h1>
        <button id='saveNote' className='py-3 px-5 text-blue-500 font-semibold text-sm mr-2' ref={saveButtonRef}>
          임시저장
        </button>
        <Button
          id='submitButton'
          disabled={titleEmpty || contentEmpty}
          className='py-2 px-4 md:py-3 md:px-6 focus:outline focus:outline-2'
        >
          작성 완료
        </Button>
      </div>
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
      {openSavedToast && (
        <div
          ref={openSavedToastRef}
          className='relative shrink-0 transition-[height] duration-1000 h-0 overflow-hidden'
        >
          <div className='absolute bottom-0 w-full bg-blue-50 text-blue-500 rounded-full py-2.5 px-3 flex gap-4 items-center mb-6'>
            <button onClick={handleCloseOpenSavedToast} type='button'>
              <IconClose circleFill='fill-blue-500' className='cursor-pointer' />
            </button>
            <p className='font-semibold text-sm grow'>임시 저장된 노트가 있어요. 저장된 노트를 불러오시겠어요?</p>
            <OpenSavedNoteModal onOpenSaved={onOpenSaved} savedNote={savedNote} />
          </div>
        </div>
      )}
      <hr />
      <div className='grow w-full relative flex flex-col'>
        <div className='w-full relative my-3 pr-10'>
          <NoteFormTitleInput initTitle={initTitle} onChangeTitleEmpty={handleTitleEmpty} />
        </div>
        <hr />
        <TiptapProviderOnOpenSaved
          className='resize-none w-full h-full focus-visible:outline-none text-slate-700 whitespace-break-spaces '
          slotBefore={
            <>
              <TiptapCharacterCount />
              {linkUrl && (
                <div
                  className='w-full rounded-full bg-slate-200 p-1 flex items-center gap-2 mb-4 cursor-pointer'
                  onClick={onOpenEmbed}
                  tabIndex={0}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') onOpenEmbed();
                  }}
                >
                  <div className='w-6 h-6 rounded-full bg-blue-500 flex justify-center items-center'>
                    <IconEmbed />
                  </div>
                  <p className='grow text-base font-normal text-slate-800'>{linkUrl}</p>
                  <input type='hidden' name='linkUrl' value={linkUrl} />
                  <button
                    className='w-6 h-6 rounded-full flex justify-center items-center'
                    type='button'
                    onClick={handleDeleteLinkUrl}
                  >
                    <IconClose />
                  </button>
                </div>
              )}
              <TiptapEditor role='textbox' aria-multiline='true' />
              <div className='lg:max-w-[768px] border border-slate-200 rounded-full py-2.5 px-4 sticky bottom-4 left-4 right-4 bg-white scrollbar-width-none overflow-visible'>
                <div className='flex gap-2 md:gap-4 w-full overflow-auto scrollbar-width-none'>
                  <NoteFormEditorButtons />
                  <div className='grow flex justify-end'>
                    <AddLinkModal linkUrl={linkUrl} onSave={onSaveLinkUrl} />
                  </div>
                </div>
                {savedToast && (
                  <div className='lg:max-w-[768px] h-12 absolute -top-2 left-0 right-0 overflow-hidden -translate-y-full'>
                    <div
                      ref={savedToastRef}
                      className='absolute bottom-0 w-full translate-y-full bg-blue-50 text-blue-500 rounded-full py-2.5 px-6 flex gap-2 items-center transition-transform duration-500'
                    >
                      <IconCheck />
                      <p className='font-semibold text-sm'>
                        임시 저장이 완료되었습니다{' '}
                        <span className='text-xs pointerfont-medium'>
                          ㆍ <SecondsTimer at={new Date(savedAt ?? 0)} />초 전
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </>
          }
        />
      </div>
    </NoteForm>
  );
};

export default NoteFormSection;
