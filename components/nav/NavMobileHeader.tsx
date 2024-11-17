import { IconHamburger } from '@/public/icons/IconHamburger';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import NavMobileSheet from './NavMobileSheet';
import { usePathname } from 'next/navigation';

type NavSectionProps = {
  children: React.ReactNode;
  className?: string;
};

type NavMobileHeader = {
  currentPageLabel?: string;
  handleTodoModalOpen: () => void;
};

const NavSection = ({ children, className }: NavSectionProps) => (
  <div className={twMerge('w-full justify-center items-center gap-4', className)}>{children}</div>
);

const NavMobileHeader: React.FC<NavMobileHeader> = ({ currentPageLabel, handleTodoModalOpen }) => {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  useEffect(() => {
    setIsSheetOpen(false);
  }, [pathname]);
  return (
    <>
      <NavSection className='flex sm:hidden lg:hidden flex-row px-[14px] py-4 justify-normal'>
        <IconHamburger
          onClick={() => setIsSheetOpen(true)}
          className='hover:cursor-pointer'
          aria-label='모바일 메뉴 열기'
        />
        <h1 className='text-base font-semibold text-slate-900'>{currentPageLabel}</h1>
      </NavSection>
      <NavMobileSheet
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
        handleTodoModalOpen={handleTodoModalOpen}
      />
    </>
  );
};

export default NavMobileHeader;
