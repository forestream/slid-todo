'use client';

import { useCurrentEditor } from '@tiptap/react';
import { ChangeEventHandler } from 'react';
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

const NoteFormEditorButtons = () => {
  const { editor } = useCurrentEditor();

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
    <>
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
    </>
  );
};
export default NoteFormEditorButtons;
