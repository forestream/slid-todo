import { useCurrentEditor } from '@tiptap/react';

const TiptapCharacterCount = () => {
  const { editor } = useCurrentEditor();

  if (!editor) return null;

  const content = editor.getText();

  return (
    <div className='w-full my-3'>
      <p className='text-slate-800 text-xs font-medium'>
        공백포함 : 총 {content.length}자 | 공백제외 : 총 {content.replaceAll(/\s+/g, '').length}자
      </p>
    </div>
  );
};
export default TiptapCharacterCount;
