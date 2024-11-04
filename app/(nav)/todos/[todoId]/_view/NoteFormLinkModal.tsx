import Button from '@/components/common/ButtonSlid';
import InputSlid from '@/components/common/InputSlid';
import { ModalClose, ModalContent, ModalProvider, ModalTrigger } from '@/components/common/Modal';
import IconAddLink from '@/public/icons/IconAddLink';
import { ChangeEventHandler, useState } from 'react';

type NoteFormLinkModalProps = {
  onSaveLinkUrl: (linkUrl: string) => void;
  linkUrl: string;
};

const NoteFormLinkModal = ({ onSaveLinkUrl, linkUrl }: NoteFormLinkModalProps) => {
  const [linkUrlValue, setLinkUrlValue] = useState(linkUrl);

  const handleSaveLinkUrl = () => onSaveLinkUrl(linkUrlValue);

  const handleChangeLinkUrlValue: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) =>
    setLinkUrlValue(e.target.value);

  return (
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
  );
};

export default NoteFormLinkModal;
