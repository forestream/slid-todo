'use client';

import IconModalClose from '@/public/icons/IconModalClose';
import {
  Children,
  cloneElement,
  ComponentPropsWithoutRef,
  createContext,
  forwardRef,
  isValidElement,
  MouseEventHandler,
  PropsWithChildren,
  Ref,
  useContext,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

const ModalContext = createContext<{ isOpen: boolean; handleOpen: () => void; handleClose: () => void } | undefined>(
  undefined
);

const ModalProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  return <ModalContext.Provider value={{ isOpen, handleOpen, handleClose }}>{children}</ModalContext.Provider>;
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
  className,
  closeOnClickOverlay = true,
  children,
  ...props
}: ComponentPropsWithoutRef<'div'> & { closeOnClickOverlay?: boolean }) => {
  const { isOpen, handleClose } = useModalContext();

  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOverlay = () => {
    if (!closeOnClickOverlay) return;
    handleClose();
  };

  if (isOpen) document.body.style.overflow = 'hidden';
  else document.body.style.overflow = '';

  return (
    <>
      {isOpen &&
        createPortal(
          <div className='fixed inset-0 flex justify-center items-center p-8' onClick={(e) => e.stopPropagation()}>
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

const ModalClose = forwardRef(
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
      <button onClick={handleClose} {...props} ref={ref}>
        {children ? children : <IconModalClose />}
      </button>
    );
  }
);

ModalClose.displayName = 'ModalClose';

export { ModalProvider, ModalTrigger, ModalContent, ModalClose, useModalContext };
