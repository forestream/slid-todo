'use client';

import { EditorContent, useCurrentEditor } from '@tiptap/react';
import { PropsWithChildren } from 'react';

const TiptapEditor = ({ ...props }: PropsWithChildren) => {
  const { editor } = useCurrentEditor();

  const handleClick = () => editor?.chain().focus().run();

  return (
    <div className='grow lg:relative cursor-text' onClick={handleClick}>
      <div className='overflow-visible h-full'>
        <EditorContent editor={editor} {...props} />
        <div className='h-20'></div>
        <input type='hidden' name='contentHTML' value={editor?.getHTML()} />
      </div>
    </div>
  );
};

export default TiptapEditor;
