'use client';

import { EditorOptions, EditorProvider } from '@tiptap/react';
import { PropsWithChildren, ReactNode } from 'react';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import StarterKit from '@tiptap/starter-kit';

const TiptapEditorProvider = ({
  className = '',
  content = '',
  slotBefore,
  editorOptions,
  children,
}: PropsWithChildren<{
  className?: string;
  content?: string;
  slotBefore?: ReactNode;
  editorOptions?: Partial<EditorOptions>;
}>) => {
  const options: Partial<EditorOptions> = {
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'px-4 mb-5 mr-4 ml-2 list-disc',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'px-4 mb-5 mr-4 ml-2 list-decimal',
          },
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Color,
      TextStyle,
      Underline,
    ],
    editorProps: {
      attributes: {
        class: className,
      },
    },
    content,
    ...editorOptions,
  };

  return (
    <EditorProvider slotBefore={slotBefore} immediatelyRender={false} {...options}>
      {children}
    </EditorProvider>
  );
};

export default TiptapEditorProvider;
