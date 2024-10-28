'use client';

import { EditorContent, useCurrentEditor } from '@tiptap/react';
import { ChangeEventHandler, PropsWithChildren, useState } from 'react';
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
import { ModalClose, ModalContent, ModalProvider, ModalTrigger } from '@/components/common/Modal';
import IconAddLink from '@/public/icons/IconAddLink';
import InputSlid from './common/InputSlid';
import Button from './common/ButtonSlid';

const TiptapEditor = ({
  linkUrl,
  onSaveLinkUrl,
  ...props
}: PropsWithChildren<{ linkUrl: string; onSaveLinkUrl: (linkUrl: string) => void }>) => {
  const [linkUrlValue, setLinkUrlValue] = useState(linkUrl);

  const handleChangeLinkUrlValue: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) =>
    setLinkUrlValue(e.target.value);

  const handleSaveLinkUrl = () => onSaveLinkUrl(linkUrlValue);

  const { editor } = useCurrentEditor();

  if (!editor) return;

  const handleBold = () => editor.chain().focus().toggleBold().run();
  const handleItalics = () => editor.chain().focus().toggleItalic().run();
  const handleUnderline = () => editor.chain().focus().toggleUnderline().run();
  const handleAlignLeft = () => editor.chain().focus().setTextAlign('left').run();
  const handleAlignCenter = () => editor.chain().focus().setTextAlign('center').run();
  const handleAlignRight = () => editor.chain().focus().setTextAlign('right').run();
  const handleBulletList = () => editor.chain().focus().toggleBulletList().run();
  const handleOrderedList = () => editor.chain().focus().toggleOrderedList().run();
  const handleChangeHighlight: ChangeEventHandler<HTMLInputElement> = (e) =>
    editor.chain().focus().toggleHighlight({ color: e.target.value }).run();

  const handleChangeColor: ChangeEventHandler<HTMLInputElement> = (e) =>
    editor.chain().focus().setColor(e.target.value).run();

  return (
    <>
      <EditorContent editor={editor} {...props} />
      <div className='w-full border border-slate-200 rounded-full py-2.5 px-4 absolute bottom-0 bg-white flex gap-4'>
        <div className='flex gap-1'>
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
        <div className='flex gap-1'>
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
        <div className='flex gap-1'>
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
    </>
  );
};
export default TiptapEditor;
