import IconModalClose from '@/public/icons/IconModalClose';
import {
  Children,
  cloneElement,
  ComponentPropsWithoutRef,
  createContext,
  forwardRef,
  isValidElement,
  PropsWithChildren,
  Ref,
  useContext,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

const SheetContext = createContext<
  { isOpen: boolean; handleOpen: () => void; handleClose: () => void; beforeClose?: () => void } | undefined
>(undefined);

const SheetProvider = ({ beforeClose, children }: PropsWithChildren<{ beforeClose?: () => void }>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => {
    beforeClose?.();
    setIsOpen(false);
  };

  return <SheetContext.Provider value={{ isOpen, handleOpen, handleClose }}>{children}</SheetContext.Provider>;
};

const useSheetContext = () => {
  const context = useContext(SheetContext);

  if (!context) {
    throw new Error('SheetProvider 안에서 사용해야합니다.');
  }

  return context;
};

const SheetTrigger = forwardRef(
  ({ children, ...props }: ComponentPropsWithoutRef<'button'>, ref: Ref<HTMLButtonElement>) => {
    const { handleOpen } = useSheetContext();

    return (
      <button onClick={handleOpen} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

SheetTrigger.displayName = 'SheetTrigger';

const SheetContent = ({
  className,
  closeOnClickOverlay = true,
  children,
  ...props
}: ComponentPropsWithoutRef<'div'> & { closeOnClickOverlay?: boolean }) => {
  const { isOpen, handleClose } = useSheetContext();

  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOverlay = () => {
    if (!closeOnClickOverlay) return;
    handleClose();
  };

  if (globalThis.window) {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }

  return (
    <>
      {isOpen &&
        createPortal(
          <div className='fixed inset-0 flex justify-end items-center' onClick={(e) => e.stopPropagation()}>
            <div className='absolute inset-0 bg-black opacity-50' onClick={handleClickOverlay}></div>
            <div
              className={twMerge('w-full h-full md:max-w-[512px] lg:max-w-[800px] p-6 bg-white z-10', className)}
              ref={ref}
              {...props}
            >
              {children}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

const SheetClose = forwardRef(
  (
    { asChild = false, children, ...props }: ComponentPropsWithoutRef<'button'> & { asChild?: boolean },
    ref: Ref<HTMLButtonElement>
  ) => {
    const { handleClose } = useSheetContext();

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

SheetClose.displayName = 'SheetClose';

export { SheetProvider, SheetTrigger, SheetContent, SheetClose, useSheetContext };
