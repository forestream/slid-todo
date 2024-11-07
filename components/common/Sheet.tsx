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
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

const SheetContext = createContext<
  | {
      isOpen: boolean;
      handleOpen: () => void;
      handleClose: () => void;
      beforeClose?: () => void;
      willBeClosed: boolean;
    }
  | undefined
>(undefined);

const SheetProvider = ({
  isOpen: initIsOpen,
  onChangeIsOpen,
  beforeClose,
  children,
}: PropsWithChildren<{ isOpen?: boolean; onChangeIsOpen?: (isOpen: boolean) => void; beforeClose?: () => void }>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [willBeClosed, setWillBeClosed] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    onChangeIsOpen?.(true);
  };

  const handleClose = () => {
    setWillBeClosed(true);

    setTimeout(() => {
      beforeClose?.();
      onChangeIsOpen?.(false);
      setIsOpen(false);
      setWillBeClosed(false);
    }, 300);
  };

  return (
    <SheetContext.Provider value={{ isOpen: initIsOpen ?? isOpen, handleOpen, handleClose, willBeClosed }}>
      {children}
    </SheetContext.Provider>
  );
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
  position,
  className,
  closeOnClickOverlay = true,
  children,
  ...props
}: ComponentPropsWithoutRef<'div'> & {
  position: 'top' | 'bottom' | 'right' | 'left';
  closeOnClickOverlay?: boolean;
}) => {
  const { isOpen, handleClose, willBeClosed } = useSheetContext();

  const transformProperties = useMemo(
    () => ({
      top: '-translate-y-full',
      bottom: 'translate-y-full',
      right: 'translate-x-full',
      left: '-translate-x-full',
    }),
    []
  );

  const variants = {
    top: 'top-0 left-0 right-0 h-full md:max-h-[512px] lg:max-h-[800px] -translate-y-full',
    bottom: 'bottom-0 left-0 right-0 h-full md:max-h-[512px] lg:max-h-[800px] translate-y-full',
    right: 'right-0 top-0 bottom-0 w-full md:max-w-[512px] lg:max-w-[800px] translate-x-full',
    left: 'left-0 top-0 bottom-0 w-full md:max-w-[512px] lg:max-w-[800px] -translate-x-full',
  };

  const ref = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const handleClickOverlay = () => {
    if (!closeOnClickOverlay) return;
    handleClose();
  };

  if (globalThis.window) {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }

  useEffect(() => {
    if (!ref.current || !overlayRef.current) return;

    if (isOpen && !willBeClosed) {
      setTimeout(() => {
        if (!ref.current || !overlayRef.current) return;
        ref.current.classList.remove(transformProperties[position]);
        overlayRef.current.classList.remove('opacity-0');
        overlayRef.current.classList.add('opacity-50');
      }, 0);
    }

    if (willBeClosed) {
      ref.current.classList.add(transformProperties[position]);
      overlayRef.current.classList.remove('opacity-50');
      overlayRef.current.classList.add('opacity-0');
    }
  }, [isOpen, position, transformProperties, willBeClosed]);

  return (
    <>
      {isOpen &&
        createPortal(
          <div className='fixed inset-0' onClick={(e) => e.stopPropagation()}>
            <div
              className='absolute inset-0 bg-black opacity-0 transition-opacity duration-300'
              onClick={handleClickOverlay}
              ref={overlayRef}
            ></div>
            <div
              className={twMerge(
                'absolute p-6 bg-white z-10 transition-transform duration-150',
                variants[position],
                className
              )}
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
