'use client';
import { ImageLogoWithText } from '@/public/images/ImageLogoWithText';
import { IconFold } from '@/public/icons/IconFold';
import { ImageLogo } from '@/public/images/ImageLogo';
import { IconHamburger } from '@/public/icons/IconHamburger';
import Button from '../common/ButtonSlid';
import Profile from './NavProfile';
import NavGoal from './NavGoal';
import NavAllTodos from './NavAllTodos';
import NavDashBoard from './NavDashBoard';
import TodoAddModal from '../modal/todoModal/TodoAddModal';
import AddTodoButton from './AddTodoButton';
import { SheetContent, SheetProvider, SheetTrigger } from '../common/Sheet';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type widthType = 'mobile' | 'tablet' | 'desktop';

const NavBar = () => {
  const modalRef = useRef<HTMLButtonElement>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSheetNavOpen, setIsSheetNavOpen] = useState(false);
  const pathname = usePathname();
  const hasMounted = useRef(false);
  const [currentPageLabel, setCurrentPageLabel] = useState('대시보드');

  const handleModalOpen = () => {
    modalRef.current?.click();
  };

  const handleNavButtonClick = (widthType?: widthType) => {
    if (widthType === 'desktop') {
      setIsNavOpen(!isNavOpen);
    } else {
      setIsSheetNavOpen(!isSheetNavOpen);
    }
  };

  // 페이지 이동 시 nav를 닫음
  useEffect(() => {
    // 첫 마운트 이후에만(페이지 이동시에만)실행
    if (hasMounted.current) {
      setIsNavOpen(false);
      setIsSheetNavOpen(false);
      setCurrentPageLabel(document.title.split('|')[0].trim());
    } else {
      hasMounted.current = true;
    }
  }, [pathname]);

  // 기본 nav
  const NavContent = () => (
    <div className='flex-shrink-0 flex-col sm:w-[280px] divide-slate-200 sm:border-r-[1px]'>
      <nav className='flex-col w-full h-full'>
        <div className='flex justify-between items-center p-4'>
          <Link className='py-2 px-[5px]' href='/dashboard'>
            <ImageLogoWithText />
          </Link>
          <Button
            className='flex justify-center items-center sm:block w-6 h-6 p-1 bg-white hover:bg-slate-100 active:bg-slate-300 rounded-lg border-[1.5px] border-slate-400'
            onClick={isNavOpen ? () => handleNavButtonClick('desktop') : () => handleNavButtonClick()}
          >
            <IconFold isFold={false} />
          </Button>
        </div>
        <div className='flex flex-col divide-y divide-slate-200'>
          <Profile className='sm:border-none lg:border-none' />
          {/* 대시보드 라벨과 새 할일 버튼 div */}
          <div className='flex flex-row sm:flex-col lg:flex-col divide-y divide-slate-200 sm:border-none lg:border-none'>
            {/* 새 할일 버튼 */}
            <div className='flex sm:justify-center items-center border-none px-4 py-6 order-2 sm:order-1 lg:order-1 ml-auto sm:w-full lg:w-full'>
              <AddTodoButton
                className='sm:mx-0 lg:mx-0 gap-[2px] rounded-xl text-sm px-3 py-2 sm:py-3 lg:py-3 sm:px-6 lg:px-6 mt-0 w-[84px] sm:w-full lg:w-full'
                onClick={handleModalOpen}
              />
            </div>
            {/* 대시보드 라벨 */}
            <div className='px-4 py-6 order-1 sm:order-2 lg:order-2'>
              <NavDashBoard />
            </div>
          </div>
          <div className='w-full flex justify-between px-4 py-6 gap-2 text-nowrap'>
            <NavAllTodos />
          </div>
          <NavGoal />
        </div>
      </nav>
    </div>
  );

  // 태블릿용 nav
  const NavWithSheet = () => (
    <SheetProvider isOpen={isSheetNavOpen} onChangeIsOpen={setIsSheetNavOpen}>
      <SheetTrigger>
        <IconFold isFold={false} />
      </SheetTrigger>
      <SheetContent position='left' className='sm:w-[280px] p-0'>
        <NavContent />
      </SheetContent>
    </SheetProvider>
  );

  // 접힌 nav
  const FoldedNav = ({ widthType, currentPageLabel }: { widthType: widthType; currentPageLabel?: string }) => {
    const visibilityClass = () => {
      switch (widthType) {
        case 'mobile':
          return 'w-full flex sm:hidden lg:hidden';
        case 'tablet':
          return 'hidden sm:flex lg:hidden';
        case 'desktop':
          return 'hidden sm:hidden lg:flex';
        default:
          return '';
      }
    };

    // 모바일용 레이아웃
    if (widthType === 'mobile') {
      return (
        <div className={`${visibilityClass()} flex-row gap-4 items-center px-4 py-3`}>
          <Button
            className='flex justify-center items-center w-6 h-6 p-1 bg-white hover:bg-slate-100 active:bg-slate-300 rounded-lg'
            onClick={() => handleNavButtonClick('mobile')}
          >
            <IconHamburger />
          </Button>
          <h1 className='text-base font-semibold text-slate-900'>{currentPageLabel}</h1>
        </div>
      );
    }

    // 태블릿/데스크탑용 레이아웃
    return (
      <div className={`${visibilityClass()} pt-4 px-[14px] flex-col space-y-4 items-center sm:border-r-[1px]`}>
        <Link href='/dashboard'>
          <ImageLogo />
        </Link>
        <Button
          className='flex justify-center items-center sm:block w-6 h-6 p-1 bg-white hover:bg-slate-100 active:bg-slate-300 rounded-lg border-[1.5px] border-slate-400'
          onClick={() => handleNavButtonClick(widthType)}
        >
          <IconFold isFold />
        </Button>
      </div>
    );
  };
  return (
    <>
      {isNavOpen || isSheetNavOpen ? (
        <>
          {/* 모바일 화면일 때 열린 Nav (NavContent) */}
          <div className='block sm:hidden lg:hidden'>
            <NavContent />
          </div>
          {/* 태블릿 화면일 때 열린 Nav (NavWithSheet) */}
          <div className='hidden sm:block lg:hidden'>
            <NavWithSheet />
          </div>
          {/* 데스크탑 화면일 때 Nav (NavContent) */}
          <div className='hidden sm:hidden lg:block'>
            <NavContent />
          </div>
        </>
      ) : (
        <>
          <FoldedNav widthType='mobile' currentPageLabel={currentPageLabel} />
          <FoldedNav widthType='tablet' />
          <FoldedNav widthType='desktop' />
        </>
      )}

      <TodoAddModal ref={modalRef} />
    </>
  );
};

export default NavBar;
