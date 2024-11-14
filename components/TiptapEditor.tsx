'use client';

import { EditorContent, EditorContentProps, useCurrentEditor } from '@tiptap/react';

const TiptapEditor = ({ ...props }: Omit<EditorContentProps, 'ref' | 'editor'>) => {
  const { editor } = useCurrentEditor();

  const handleClick = () => editor?.chain().focus().run();

  return (
    <div className='grow lg:relative cursor-text' onClick={handleClick}>
      <div className='overflow-visible h-full'>
        <EditorContent editor={editor} {...props} />
        <div className='h-20'></div>
        <input type='hidden' name='contentHTML' value={editor?.getHTML()} aria-hidden='true' />
      </div>
    </div>
  );
};

export default TiptapEditor;
