'use client';

import Button from '@/components/common/ButtonSlid';
import { ModalClose, ModalContent, ModalProvider, ModalTrigger } from '@/components/common/Modal';
import TiptapEditor from '@/components/TiptapEditor';
import useNoteMutation from '@/lib/hooks/useNoteMutation';
import useTodosQuery from '@/lib/hooks/useTodosQuery';
import IconClose from '@/public/icons/IconClose';
import IconEmbed from '@/public/icons/IconEmbed';
import IconFlag from '@/public/icons/IconFlag';
import { useParams } from 'next/navigation';
import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import TiptapCharacterCount from './TiptapCharacterCount';
import IconCheck from '@/public/icons/IconCheck';
import { useCurrentEditor } from '@tiptap/react';
import LinkEmbed from './LinkEmbed';

type NoteFormProps = {
  title?: string;
  content?: string;
  linkUrl?: string;
  method?: 'POST' | 'PATCH';
  noteId?: string;
};

const NoteForm = ({ title: initTitle = '', linkUrl: initLinkUrl = '', method = 'POST', noteId }: NoteFormProps) => {
  const { editor } = useCurrentEditor();
  const { todoId } = useParams();
  const { data } = useTodosQuery(todoId as string);
  const todo = data?.todos.find((todo) => todo.id === Number(todoId));
  const { mutate } = useNoteMutation(todoId as string);
  const [title, setTitle] = useState(initTitle);
  const [linkUrl, setLinkUrl] = useState(initLinkUrl);
  const [savedToast, setSavedToast] = useState(false);
  const [openSavedToast, setOpenSavedToast] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  const handleChangeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value.length > 30 ? e.target.value.slice(0, 30) : e.target.value);
  };
  const handleSaveLinkUrl = (linkUrlValue: string) => setLinkUrl(linkUrlValue);

  const handleSave = useCallback(() => {
    window.localStorage.setItem(
      'savedNote' + todoId,
      JSON.stringify({ todoId, title: titleRef.current?.value, content: editor?.getHTML(), linkUrl })
    );
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
    }, 1000 * 5);
  }, [todoId, linkUrl, editor]);

  const savedNote = useMemo(() => {
    if (!globalThis.window) return;
    const item = window.localStorage.getItem('savedNote' + todoId);
    return item && JSON.parse(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoId, savedToast]);

  const handleOpenSaved = () => {
    setTitle(savedNote.title.length ? savedNote.title : '제목없음');
    setLinkUrl(savedNote.linkUrl);
    setOpenSavedToast(false);
  };

  const handleCloseOpenSavedToast = () => setOpenSavedToast(false);

  useEffect(() => {
    const id = setInterval(() => {
      handleSave();
    }, 1000 * 60 * 5);

    return () => clearInterval(id);
  }, [handleSave, todoId]);

  useEffect(() => {
    if (savedNote) setOpenSavedToast(true);
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

    mutate({
      noteId,
      options: { method, body: JSON.stringify(note) },
    });
  };

  return (
    <>
      <section className='lg:w-10 lg:h-screen'>
        <LinkEmbed linkUrl={linkUrl} />
      </section>
      <section className='max-w-[800px] w-full py-6 px-10 flex flex-col grow'>
        <div className='flex w-full items-center mb-4'>
          <h1 className='grow text-slate-900 font-semibold text-lg'>노트 작성</h1>
          <button className='py-3 px-5 text-blue-500 font-semibold text-sm mr-2' onClick={handleSave}>
            임시저장
          </button>
          <Button disabled={!title.length || !editor?.getText().length} onClick={handleClickSubmit}>
            작성 완료
          </Button>
        </div>
        <div className='flex w-full gap-1.5 mb-3'>
          <div className='flex justify-center items-center rounded-md bg-slate-800 w-6 h-6'>
            <IconFlag />
          </div>
          <p className='font-medium text-base text-slate-800'>{todo?.goal.title}</p>
        </div>
        <div className='flex w-full gap-2 mb-6'>
          <p className='rounded-md bg-slate-100 p-1 text-slate-700 text-xs'>To do</p>
          <p className='text-sm font-normal text-slate-700'>{todo?.title}</p>
        </div>

        {openSavedToast && (
          <div className='w-full bg-blue-50 text-blue-500 rounded-full py-2.5 px-3 flex gap-4 items-center mb-6'>
            <button onClick={handleCloseOpenSavedToast}>
              <IconClose circleFill='fill-blue-500' className='cursor-pointer' />
            </button>
            <p className='font-semibold text-sm grow'>임시 저장된 노트가 있어요. 저장된 노트를 불러오시겠어요?</p>
            <ModalProvider>
              <ModalTrigger className='rounded-full bg-white border border-blue-500 text-blue-500 text-sm font-semibold py-2 px-4'>
                불러오기
              </ModalTrigger>
              <ModalContent className='max-w-[450px] flex flex-col items-center w-full'>
                <p className='font-medium mt-2'>&apos;{savedNote.title.length ? savedNote.title : '제목없음'}&apos;</p>
                <p className='font-medium mb-8'>제목의 노트를 불러오시겠어요?</p>
                <div className='flex gap-2'>
                  <ModalClose asChild>
                    <Button variant='outlined' className='w-[120px]'>
                      취소
                    </Button>
                  </ModalClose>
                  <ModalClose asChild>
                    <Button onClick={handleOpenSaved} className='w-[120px]'>
                      불러오기
                    </Button>
                  </ModalClose>
                </div>
              </ModalContent>
            </ModalProvider>
          </div>
        )}
        <hr />
        <form className='grow w-full h-fit relative flex flex-col' onSubmit={handleSubmit}>
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
              <p className='grow text-base font-normal text-slate-800'>{linkUrl}</p>
              <div className='w-6 h-6 rounded-full flex justify-center items-center'>
                <IconClose />
              </div>
            </div>
          )}
          <div className='grow'>
            <TiptapEditor linkUrl={initLinkUrl} onSaveLinkUrl={handleSaveLinkUrl} />
          </div>
          {savedToast && (
            <div className='absolute top-0 -translate-y-full w-full bg-blue-50 text-blue-500 rounded-full py-2.5 px-6 -ml-4 -mt-4 flex gap-2 items-center'>
              <IconCheck />
              <p className='font-semibold text-sm'>
                임시 저장이 완료되었습니다 <span className='text-xs pointerfont-medium'>ㆍ {}초전</span>
              </p>
            </div>
          )}
        </form>
      </section>
    </>
  );
};

export default NoteForm;
