'use client';

import IconModalClose from '@/public/icons/IconModalClose';
import {
  Children,
  cloneElement,
  ComponentPropsWithoutRef,
  createContext,
  forwardRef,
  isValidElement,
  memo,
  PropsWithChildren,
  Ref,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

const ModalContext = createContext<
  { isOpen: boolean; handleOpen: () => void; handleClose: () => void; beforeClose?: () => void } | undefined
>(undefined);

const ModalProvider = ({
  isOpen: initIsOpen,
  onChangeIsOpen,
  beforeClose,
  children,
}: PropsWithChildren<{ isOpen?: boolean; onChangeIsOpen?: (isOpen: boolean) => void; beforeClose?: () => void }>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    onChangeIsOpen?.(true);
  };

  const handleClose = () => {
    beforeClose?.();
    onChangeIsOpen?.(false);
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isOpen: initIsOpen ?? isOpen, handleOpen, handleClose }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('ModalProvider 안에서 사용해야합니다.');
  }

  return context;
};

const ModalTrigger = forwardRef(
  ({ children, ...props }: ComponentPropsWithoutRef<'button'>, ref: Ref<HTMLButtonElement>) => {
    const { handleOpen } = useModalContext();

    return (
      <button onClick={handleOpen} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

ModalTrigger.displayName = 'ModalTrigger';

const ModalContent = ({
  overlayClassName,
  className,
  closeOnClickOverlay = true,
  children,
  ...props
}: ComponentPropsWithoutRef<'div'> & { overlayClassName?: string; closeOnClickOverlay?: boolean }) => {
  const { isOpen, handleClose } = useModalContext();

  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOverlay = () => {
    if (!closeOnClickOverlay) return;
    handleClose();
  };

  if (globalThis.window) {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }

  useEffect(() => {
    const handleKeyUpOnBody = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    if (isOpen) document.body.addEventListener('keyup', handleKeyUpOnBody);

    return () => document.body.removeEventListener('keyup', handleKeyUpOnBody);
  }, [handleClose, isOpen]);

  return (
    <>
      {isOpen &&
        createPortal(
          <div
            role='dialog'
            aria-modal='true'
            className={twMerge('fixed inset-0 flex justify-center items-center z-20', overlayClassName)}
            onClick={(e) => e.stopPropagation()}
          >
            <div className='absolute inset-0 bg-black opacity-50' onClick={handleClickOverlay}></div>
            <div className={twMerge('p-6 rounded-xl bg-white z-10', className)} ref={ref} {...props}>
              {children}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

const ModalClose = memo(
  forwardRef(
    (
      { asChild = false, children, ...props }: ComponentPropsWithoutRef<'button'> & { asChild?: boolean },
      ref: Ref<HTMLButtonElement>
    ) => {
      const { handleClose } = useModalContext();

      if (asChild && Children.count(children) === 1 && isValidElement(children)) {
        return cloneElement(children, {
          ...props,
          ...children.props,
          onClick: () => {
            if (children.props.onClick) children.props.onClick();
            handleClose();
          },
          ref,
        });
      }

      return (
        <button type='button' onClick={handleClose} {...props} ref={ref}>
          {children ? children : <IconModalClose />}
        </button>
      );
    }
  )
);

ModalClose.displayName = 'ModalClose';

export { ModalProvider, ModalTrigger, ModalContent, ModalClose, useModalContext };
