import { DELETE_ITEM_TEXTS } from '@/constants';
import Button from '../common/ButtonSlid';
import { ModalContent, ModalProvider } from '../common/Modal';

export type DeleteItemType = 'goal' | 'note' | 'todo';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onChangeIsOpen: (value: boolean) => void;
  onDelete: () => void;
  itemType: DeleteItemType;
  customTitle?: string;
  customMessage?: string;
}

const DeleteConfirmationModal = ({
  isOpen,
  onChangeIsOpen,
  onDelete,
  itemType,
  customTitle,
  customMessage,
}: DeleteConfirmationModalProps) => {
  const { title, message } = DELETE_ITEM_TEXTS[itemType];

  return (
    <ModalProvider isOpen={isOpen} onChangeIsOpen={onChangeIsOpen}>
      <ModalContent closeOnClickOverlay={false} className='sm:w-[450px]'>
        <div className='flex flex-col items-center gap-4'>
          <h1 className='text-lg font-bold'>{customTitle ?? title}</h1>
          <p className='text-center whitespace-pre-line'>{customMessage ?? message}</p>
          <div className='flex gap-4'>
            <Button className='w-[120px] py-3' variant='outlined' onClick={() => onChangeIsOpen(false)}>
              취소
            </Button>
            <Button className='w-[120px] py-3' onClick={onDelete}>
              삭제
            </Button>
          </div>
        </div>
      </ModalContent>
    </ModalProvider>
  );
};

export default DeleteConfirmationModal;
