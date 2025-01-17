import { IconHamburger } from '@/public/icons/IconHamburger';
import { useEffect, useState } from 'react';
import NavMobileSheet from './NavMobileSheet';
import { usePathname } from 'next/navigation';
import NavSection from './NavSection';

type NavMobileHeader = {
  currentPageLabel?: string;
  handleTodoModalOpen: () => void;
};

const NavMobileHeader: React.FC<NavMobileHeader> = ({ currentPageLabel, handleTodoModalOpen }) => {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  useEffect(() => {
    setIsSheetOpen(false);
  }, [pathname]);
  return (
    <>
      <nav aria-label='모바일 헤더' className='fixed top-0 left-0 right-0 z-10'>
        <NavSection className='flex sm:hidden flex-row px-[14px] py-4 justify-normal backdrop-saturate-180 backdrop-blur-sm'>
          <div
            role='button'
            onClick={() => setIsSheetOpen(true)}
            className='hover:cursor-pointer'
            aria-label='모바일 네비게이션 열기/닫기'
            aria-expanded='false'
          >
            <IconHamburger />
          </div>

          <h1 className='text-base font-semibold text-slate-900'>{currentPageLabel}</h1>
        </NavSection>
      </nav>
      <NavMobileSheet
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
        handleTodoModalOpen={handleTodoModalOpen}
      />
    </>
  );
};

export default NavMobileHeader;
