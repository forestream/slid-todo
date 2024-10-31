'use client';

import { ModalClose, ModalContent, ModalProvider, ModalTrigger } from '@/components/common/Modal';
import TiptapEditor from '@/components/TiptapEditor';
import useNoteMutation from '@/lib/hooks/useNoteMutation';
import IconClose from '@/public/icons/IconClose';
import IconEmbed from '@/public/icons/IconEmbed';
import IconFlag from '@/public/icons/IconFlag';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import {
  ChangeEventHandler,
  FormEventHandler,
  memo,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import TiptapCharacterCount from './TiptapCharacterCount';
import IconCheck from '@/public/icons/IconCheck';
import { useCurrentEditor } from '@tiptap/react';
import IconTextAlignLeft from '@/public/icons/IconTextAlignLeft';
import IconTextAlignMiddle from '@/public/icons/IconTextAlignMiddle';
import IconTextAlignRight from '@/public/icons/IconTextAlignRight';
import IconTextBold from '@/public/icons/IconTextBold';
import IconTextBulletPoint from '@/public/icons/IconTextBulletPoint';
import IconTextColor from '@/public/icons/IconTextColor';
import IconTextItalics from '@/public/icons/IconTextItalics';
import IconTextNumberPoint from '@/public/icons/IconTextNumberPoint';
import IconTextUnderline from '@/public/icons/IconTextUnderline';
import IconTextHighlight from '@/public/icons/IconTextHighlight';
import IconAddLink from '@/public/icons/IconAddLink';
import InputSlid from '@/components/common/InputSlid';
import Button from '@/components/common/ButtonSlid';
import ModalSavedNote from './ModalSavedNote';
import { afterNoteMutation } from '@/app/actions';
import { useQueryClient } from '@tanstack/react-query';

export type SavedNote = {
  title: string;
  content: string;
  linkUrl: string;
} | null;

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

const NoteFormContent = memo(
  ({
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
    const queryClient = useQueryClient();
    const router = useRouter();
    const searchParams = useSearchParams();
    const todoTitle = searchParams.get('todo');
    const goalTitle = searchParams.get('goal');
    const { editor } = useCurrentEditor();
    const [linkUrlValue, setLinkUrlValue] = useState(linkUrl);
    const { todoId } = useParams();
    const { mutate } = useNoteMutation(todoId as string);
    const [title, setTitle] = useState(initTitle);
    const titleRef = useRef<HTMLInputElement>(null);

    const handleChangeLinkUrlValue: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) =>
      setLinkUrlValue(e.target.value);
    const handleSaveLinkUrl = () => onSaveLinkUrl(linkUrlValue);
    const handleChangeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
      setTitle(e.target.value.length > 30 ? e.target.value.slice(0, 30) : e.target.value);
    };
    const handleSave = useCallback(() => {
      window.localStorage.setItem(
        'savedNote' + todoId,
        JSON.stringify({ todoId, title: titleRef.current?.value, content: editor?.getHTML(), linkUrl })
      );
      onChangeSavedToast(true);
      setTimeout(() => {
        onChangeSavedToast(false);
      }, 1000 * 5);
    }, [todoId, editor, linkUrl, onChangeSavedToast]);

    const handleCloseOpenSavedToast = () => onChangeOpenSavedToast(false);

    useEffect(() => {
      const id = setInterval(() => {
        handleSave();
      }, 1000 * 60 * 5);

      return () => clearInterval(id);
    }, [handleSave, todoId]);

    useEffect(() => {
      if (savedNote) onChangeOpenSavedToast(true);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();
    };

    const handleClickSubmit: MouseEventHandler<HTMLButtonElement> = async () => {
      const note: {
        title: string;
        content: string | undefined;
        todoId: number;
        linkUrl?: string;
      } = {
        title,
        content: editor?.getHTML(),
        todoId: +todoId,
        linkUrl,
      };

      if (!note.linkUrl) {
        delete note.linkUrl;
      }

      mutate(
        {
          noteId,
          options: { method, body: JSON.stringify(note) },
        },
        {
          onSuccess: () => {
            afterNoteMutation(Array.isArray(todoId) ? todoId[0] : todoId, noteId ?? '0');
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            router.back();
          },
        }
      );
    };

    const handleBold = () => editor?.chain().focus().toggleBold().run();
    const handleItalics = () => editor?.chain().focus().toggleItalic().run();
    const handleUnderline = () => editor?.chain().focus().toggleUnderline().run();
    const handleAlignLeft = () => editor?.chain().focus().setTextAlign('left').run();
    const handleAlignCenter = () => editor?.chain().focus().setTextAlign('center').run();
    const handleAlignRight = () => editor?.chain().focus().setTextAlign('right').run();
    const handleBulletList = () => editor?.chain().focus().toggleBulletList().run();
    const handleOrderedList = () => editor?.chain().focus().toggleOrderedList().run();
    const handleChangeHighlight: ChangeEventHandler<HTMLInputElement> = (e) =>
      editor?.chain().focus().toggleHighlight({ color: e.target.value }).run();
    const handleChangeColor: ChangeEventHandler<HTMLInputElement> = (e) =>
      editor?.chain().focus().setColor(e.target.value).run();

    return (
      <section className='lg:max-w-[800px] w-full h-full p-4 md:p-6 lg:py-6 lg:px-10 flex flex-col grow '>
        <div className='flex w-full items-center mb-4'>
          <h1 className='grow text-slate-900 font-semibold text-lg'>노트 작성</h1>
          <button className='py-3 px-5 text-blue-500 font-semibold text-sm mr-2' onClick={handleSave}>
            임시저장
          </button>
          <Button
            disabled={!title.length || !editor?.getText().length}
            onClick={handleClickSubmit}
            className='py-2 px-4 md:py-3 md:px-6'
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
          <div className='w-full bg-blue-50 text-blue-500 rounded-full py-2.5 px-3 flex gap-4 items-center mb-6'>
            <button onClick={handleCloseOpenSavedToast}>
              <IconClose circleFill='fill-blue-500' className='cursor-pointer' />
            </button>
            <p className='font-semibold text-sm grow'>임시 저장된 노트가 있어요. 저장된 노트를 불러오시겠어요?</p>
            <ModalSavedNote onOpenSaved={onOpenSaved} savedNote={savedNote} />
          </div>
        )}
        <hr />
        <form className='grow w-full relative flex flex-col' onSubmit={handleSubmit}>
          <div className='w-full relative h-7 my-3'>
            <input
              className='w-full text-lg font-medium focus-visible:outline-none'
              placeholder='노트의 제목을 입력해주세요'
              value={title}
              onChange={handleChangeTitle}
              ref={titleRef}
            />
            <p className='absolute right-0 top-0 text-slate-800 font-medium text-xs'>
              {title.length}/<span className='text-blue-500'>30</span>
            </p>
          </div>
          <hr />
          <TiptapCharacterCount />
          {linkUrl && (
            <div className='w-full rounded-full bg-slate-200 p-1 flex items-center gap-2 mb-4'>
              <div className='w-6 h-6 rounded-full bg-blue-500 flex justify-center items-center'>
                <IconEmbed />
              </div>
              <p className='grow text-base font-normal text-slate-800 cursor-pointer' onClick={onOpenEmbed}>
                {linkUrl}
              </p>
              <div className='w-6 h-6 rounded-full flex justify-center items-center'>
                <IconClose />
              </div>
            </div>
          )}
          <div className='grow lg:relative'>
            <div className='overflow-visible h-full'>
              <TiptapEditor />
            </div>
          </div>
          <div className='lg:max-w-[768px] border border-slate-200 rounded-full py-2.5 px-4 fixed lg:sticky bottom-4 left-4 right-4 bg-white flex gap-2 md:gap-4 overflow-auto scrollbar-width-none'>
            <div className='flex md:gap-1'>
              <button onClick={handleBold}>
                <IconTextBold className='cursor-pointer hover:bg-slate-100' />
              </button>
              <button onClick={handleItalics}>
                <IconTextItalics className='cursor-pointer hover:bg-slate-100' />
              </button>
              <button onClick={handleUnderline}>
                <IconTextUnderline className='cursor- hover:bg-slate-100' />
              </button>
            </div>
            <div className='flex md:gap-1'>
              <button onClick={handleAlignLeft}>
                <IconTextAlignLeft className='cursor-pointer hover:bg-slate-100' />
              </button>
              <button onClick={handleAlignCenter}>
                <IconTextAlignMiddle className='cursor-pointer hover:bg-slate-100' />
              </button>
              <button onClick={handleAlignRight}>
                <IconTextAlignRight className='cursor-pointer hover:bg-slate-100' />
              </button>
            </div>
            <div className='flex md:gap-1'>
              <button onClick={handleBulletList}>
                <IconTextBulletPoint className='cursor-pointer hover:bg-slate-100' />
              </button>
              <button onClick={handleOrderedList}>
                <IconTextNumberPoint className='cursor-pointer hover:bg-slate-100' />
              </button>
              <label htmlFor='textHighlight' className='relative'>
                <input id='textHighlight' type='color' className='w-0 h-0 absolute' onChange={handleChangeHighlight} />
                <IconTextHighlight className='cursor-pointer hover:bg-slate-100' />
              </label>
              <label htmlFor='textColor' className='relative'>
                <input id='textColor' type='color' className='w-0 h-0 absolute' onChange={handleChangeColor} />
                <IconTextColor className='cursor-pointer hover:bg-slate-100' />
              </label>
            </div>
            <div className='grow flex justify-end'>
              <ModalProvider>
                <ModalTrigger type='button'>
                  <IconAddLink className='cursor-pointer hover:bg-slate-100' />
                </ModalTrigger>
                <ModalContent className='w-full max-w-[520px] flex flex-col'>
                  <div className='flex justify-between mb-6'>
                    <h1 className='text-lg font-bold'>링크 업로드</h1>
                    <ModalClose />
                  </div>
                  <InputSlid
                    label='링크'
                    type='text'
                    placeholder='영상이나 글, 파일의 링크를 넣어주세요'
                    className='mb-10'
                    value={linkUrlValue}
                    onChange={handleChangeLinkUrlValue}
                  />
                  <ModalClose asChild>
                    <Button className='w-full' onClick={handleSaveLinkUrl}>
                      확인
                    </Button>
                  </ModalClose>
                </ModalContent>
              </ModalProvider>
            </div>
          </div>
          {savedToast && (
            <div className='max-w-[768px] fixed lg:sticky bottom-0 left-4 right-4 -translate-y-[155%] bg-blue-50 text-blue-500 rounded-full py-2.5 px-6 flex gap-2 items-center'>
              <IconCheck />
              <p className='font-semibold text-sm'>
                임시 저장이 완료되었습니다 <span className='text-xs pointerfont-medium'>ㆍ {}초전</span>
              </p>
            </div>
          )}
        </form>
      </section>
    );
  }
);

NoteFormContent.displayName = 'NoteFormContent';

export default NoteFormContent;
