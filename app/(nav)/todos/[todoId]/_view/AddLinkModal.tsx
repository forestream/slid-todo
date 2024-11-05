import Button from '@/components/common/ButtonSlid';
import InputSlid from '@/components/common/InputSlid';
import { ModalClose, ModalContent, ModalProvider, ModalTrigger } from '@/components/common/Modal';
import IconAddLink from '@/public/icons/IconAddLink';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';

type AddLinkModalProps = {
  linkUrl: string;
  onSave: (linkUrl: string) => void;
};

const ModalInput = ({ linkUrl }: { linkUrl: string }) => {
  const [linkUrlValue, setLinkUrlValue] = useState(linkUrl);
  const handleChangeLinkUrlValue: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) =>
    setLinkUrlValue(e.target.value);

  return (
    <InputSlid
      name='linkUrl'
      label='링크'
      type='text'
      placeholder='영상이나 글, 파일의 링크를 넣어주세요'
      className='mb-10'
      value={linkUrlValue}
      onChange={handleChangeLinkUrlValue}
    />
  );
};

const AddLinkModal = ({ linkUrl, onSave }: AddLinkModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSaveLinkUrl: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    onSave((formData.get('linkUrl') as string) ?? '');
    setIsOpen(false);
  };

  return (
    <ModalProvider isOpen={isOpen} onChangeIsOpen={setIsOpen}>
      <ModalTrigger type='button'>
        <IconAddLink className='cursor-pointer hover:bg-slate-100' />
      </ModalTrigger>
      <ModalContent className='w-full max-w-[520px] flex flex-col'>
        <div className='flex justify-between mb-6'>
          <h1 className='text-lg font-bold'>링크 업로드</h1>
          <ModalClose />
        </div>
        <form onSubmit={handleSaveLinkUrl}>
          <ModalInput linkUrl={linkUrl} />
          <Button className='w-full'>확인</Button>
        </form>
      </ModalContent>
    </ModalProvider>
  );
};
export default AddLinkModal;
