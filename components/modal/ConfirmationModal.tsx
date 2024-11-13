import { CONFIRMATION_ITEM_TEXTS } from '@/constants';
import Button from '../common/ButtonSlid';
import { ModalContent, ModalProvider } from '../common/Modal';

interface ConfirmationModalProps {
  isOpen: boolean;
  onChangeIsOpen: (value: boolean) => void;
  onConfirm: () => void;
  itemType: keyof typeof CONFIRMATION_ITEM_TEXTS;
  itemTitle?: string;
  cancelText?: string;
  confirmText?: string;
  confirmButtonVariant?: 'filled' | 'outlined';
  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
}

const ConfirmationModal = ({
  isOpen,
  onChangeIsOpen,
  onConfirm,
  itemType,
  itemTitle,
  cancelText = '취소',
  confirmText = '확인',
  confirmButtonVariant = 'filled',
  confirmButtonClassName = 'w-[120px] py-3',
  cancelButtonClassName = 'w-[120px] py-3',
}: ConfirmationModalProps) => {
  const { title, message } = CONFIRMATION_ITEM_TEXTS[itemType];
  return (
    <ModalProvider isOpen={isOpen} onChangeIsOpen={onChangeIsOpen}>
      <ModalContent closeOnClickOverlay={false} className='sm:w-[450px]'>
        <div className='flex flex-col items-center gap-4'>
          <h1 className='text-lg font-bold'>{title}</h1>
          <p className='text-center whitespace-pre-line'>{itemTitle ? `${itemTitle} ${message}` : message}</p>
          <div className='flex gap-4'>
            <Button className={cancelButtonClassName} variant='outlined' onClick={() => onChangeIsOpen(false)}>
              {cancelText}
            </Button>
            <Button className={confirmButtonClassName} variant={confirmButtonVariant} onClick={onConfirm}>
              {confirmText}
            </Button>
          </div>
        </div>
      </ModalContent>
    </ModalProvider>
  );
};

export default ConfirmationModal;
