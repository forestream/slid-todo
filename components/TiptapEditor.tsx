'use client';

import { EditorContent, useCurrentEditor } from '@tiptap/react';
import { PropsWithChildren } from 'react';

const TiptapEditor = ({ ...props }: PropsWithChildren) => {
  const { editor } = useCurrentEditor();

  if (!editor) return;

  return (
    <>
      <EditorContent editor={editor} {...props} />
      <div className='h-20'></div>
    </>
  );
};
export default TiptapEditor;
