'use client';
import { ImageLogoWithText } from '@/public/images/ImageLogoWithText';
import { IconFold } from '@/public/icons/IconFold';
import { ImageLogo } from '@/public/images/ImageLogo';
import Button from '../common/ButtonSlid';
import Profile from './NavProfile';
import NavGoal from './NavGoal';
import TodoAddModal from '../modal/todoModal/TodoAddModal';
import AddTodoButton from './AddTodoButton';
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from '@/constants';
import { SheetContent, SheetProvider, SheetTrigger } from '../common/Sheet';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import NavAllTodos from './NavAllTodos';
import NavDashBoard from './NavDashBoard';

const NavBar = () => {
  const modalRef = useRef<HTMLButtonElement>(null);
  const [isNavOpened, setIsNavOpened] = useState(false);
  const pathname = usePathname();
  const hasMounted = useRef(false);

  // 태블릿에서만 nav를 좌측 modal처럼 사용
  const isTablet = () => MOBILE_BREAKPOINT < window.innerWidth && window.innerWidth < TABLET_BREAKPOINT;

  const handleModalOpen = () => {
    modalRef.current?.click();
  };

  const handleFoldButtonClick = () => {
    setIsNavOpened(!isNavOpened);
  };

  // 페이지 이동 시 nav를 닫음
  useEffect(() => {
    // 첫 마운트 이후에만(페이지 이동시에만) 실행
    if (hasMounted.current) {
      setIsNavOpened(false);
    } else {
      hasMounted.current = true;
    }
  }, [pathname]);

  const NavContent = () => (
    <div className='flex-shrink-0 w-screen h-screen flex-col sm:w-[280px] divide-slate-200 sm:border-r-[1px]'>
      <nav className='flex-col w-full h-full'>
        <div className='flex justify-between items-center p-4'>
          <Link className='py-2 px-[5px]' href='/dashboard'>
            <ImageLogoWithText />
          </Link>
          <Button
            className='flex justify-center items-center sm:block w-6 h-6 p-1 bg-white hover:bg-slate-100 active:bg-slate-300 rounded-lg border-[1.5px] border-slate-400'
            onClick={handleFoldButtonClick}
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

  return (
    <>
      {isNavOpened ? (
        isTablet() ? (
          <SheetProvider isOpen={isNavOpened} onChangeIsOpen={setIsNavOpened}>
            <SheetTrigger>
              <IconFold isFold={false} />
            </SheetTrigger>
            <SheetContent position='left' className='w-[280px] p-0'>
              <NavContent />
            </SheetContent>
          </SheetProvider>
        ) : (
          <NavContent />
        )
      ) : (
        <nav className='pt-4 px-[14px] flex flex-col gap-4 items-center sm:border-r-[1px]'>
          <Link href='/dashboard'>
            <ImageLogo />
          </Link>
          <Button
            className='flex justify-center items-center sm:block w-6 h-6 p-1 bg-white hover:bg-slate-100 active:bg-slate-300 rounded-lg border-[1.5px] border-slate-400'
            onClick={handleFoldButtonClick}
          >
            <IconFold isFold />
          </Button>
        </nav>
      )}

      <TodoAddModal ref={modalRef} />
    </>
  );
};

export default NavBar;
