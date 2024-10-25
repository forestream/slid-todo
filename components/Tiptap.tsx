'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { PropsWithChildren } from 'react';
import IconTextAlignLeft from '@/public/icons/IconTextAlignLeft';
import IconTextAlignMiddle from '@/public/icons/IconTextAlignMiddle';
import IconTextAlignRight from '@/public/icons/IconTextAlignRight';
import IconTextBold from '@/public/icons/IconTextBold';
import IconTextBulletPoint from '@/public/icons/IconTextBulletPoint';
import IconTextColor from '@/public/icons/IconTextColor';
import IconTextItalics from '@/public/icons/IconTextItalics';
import IconTextNumberPoint from '@/public/icons/IconTextNumberPoint';
import IconTextUnderline from '@/public/icons/IconTextUnderline';
// import { ModalClose, ModalContent, ModalProvider, ModalTrigger } from './common/Modal';
// import IconAddLink from '@/public/icons/IconAddLink';
// import InputSlid from './common/InputSlid';
// import Button from './common/ButtonSlid';

const Tiptap = ({ className, content, ...props }: PropsWithChildren<{ className: string; content: string }>) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
  });

  const handleBold = () => editor?.chain().focus().toggleBold().run();
  const handleItalics = () => editor?.chain().focus().toggleItalic().run();
  // const handleUnderline = () => editor?.chain().focus().toggle().run();

  return (
    <>
      <EditorContent editor={editor} className={className} {...props} />
      <div className='w-full border border-slate-200 rounded-full py-2.5 px-4 absolute bottom-0 bg-white flex gap-4'>
        <div className='flex gap-1'>
          <button onClick={handleBold}>
            <IconTextBold className='cursor-pointer hover:bg-slate-100' />
          </button>
          <IconTextItalics className='cursor-pointer hover:bg-slate-100' />
          <IconTextUnderline className='cursor-pointer hover:bg-slate-100' />
        </div>
        <div className='flex gap-1'>
          <IconTextAlignLeft className='cursor-pointer hover:bg-slate-100' />
          <IconTextAlignMiddle className='cursor-pointer hover:bg-slate-100' />
          <IconTextAlignRight className='cursor-pointer hover:bg-slate-100' />
        </div>
        <div className='flex gap-1'>
          <IconTextBulletPoint className='cursor-pointer hover:bg-slate-100' />
          <IconTextNumberPoint className='cursor-pointer hover:bg-slate-100' />
          <IconTextColor className='cursor-pointer hover:bg-slate-100' />
        </div>
        {/* <div className='grow flex justify-end'>
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
        {savedToast && (
          <div className='absolute top-0 -translate-y-full w-full bg-blue-50 text-blue-500 rounded-full py-2.5 px-6 -ml-4 -mt-4 flex gap-2 items-center'>
            <IconCheck />
            <p className='font-semibold text-sm'>
              임시 저장이 완료되었습니다 <span className='text-xs font-medium'>ㆍ {}초전</span>
            </p>
          </div>
        )} */}
      </div>
    </>
  );
};

export default Tiptap;
