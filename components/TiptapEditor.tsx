'use client';

import { EditorContent, useCurrentEditor } from '@tiptap/react';
import { PropsWithChildren } from 'react';

const TiptapEditor = ({ ...props }: PropsWithChildren) => {
  const { editor } = useCurrentEditor();

  if (!editor) return;

  return (
    <div className='grow lg:relative'>
      <div className='overflow-visible h-full'>
        <EditorContent editor={editor} {...props} />
        <div className='h-20'></div>
        <input type='hidden' name='contentHTML' value={editor.getHTML()} />
      </div>
    </div>
  );
};

export default TiptapEditor;
