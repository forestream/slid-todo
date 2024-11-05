import { ChangeEventHandler, ComponentPropsWithoutRef, useEffect, useState } from 'react';

type NoteFormTitleInputProps = {
  initTitle: string;
  onChangeTitleEmpty: (disabled: boolean) => void;
};

const NoteFormTitleInput = ({
  initTitle,
  onChangeTitleEmpty,
}: ComponentPropsWithoutRef<'input'> & NoteFormTitleInputProps) => {
  const [title, setTitle] = useState('');

  const handleChangeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChangeTitleEmpty(!e.target.value);

    setTitle(e.target.value.length > 30 ? e.target.value.slice(0, 30) : e.target.value);
  };

  useEffect(() => {
    setTitle(initTitle);
  }, [initTitle]);

  return (
    <>
      <input
        name='noteTitle'
        className='w-full text-lg font-medium focus-visible:outline-none'
        placeholder='노트의 제목을 입력해주세요'
        value={title}
        onChange={handleChangeTitle}
      />
      <p className='absolute right-0 top-0 text-slate-800 font-medium text-xs'>
        {title.length}/<span className='text-blue-500'>30</span>
      </p>
    </>
  );
};

export default NoteFormTitleInput;
