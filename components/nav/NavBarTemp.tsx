'use client';
import { useEffect, useRef, useState } from 'react';
import Button from '../common/ButtonSlid';
import { IconFold } from '@/public/icons/IconFold';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { ImageLogo } from '@/public/images/ImageLogo';
import { ImageLogoWithText } from '@/public/images/ImageLogoWithText';
import Profile from './NavProfile';
import NavAllTodos from './NavAllTodos';
import AddTodoButton from './AddTodoButton';
import NavDashBoard from './NavDashBoard';
import NavGoal from './NavGoal';
import { IconHamburger } from '@/public/icons/IconHamburger';
import { usePathname } from 'next/navigation';
import { TABLET_BREAKPOINT } from '@/constants';
import TodoAddModal from '../modal/todoModal/TodoAddModal';

type widthType = 'mobile' | 'tablet' | 'desktop';

const NavBarTemp = () => {
  const [isNavOpen, setIsNavOpen] = useState(true); //데스크탑 기본 nav 열림 여부 true
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false); // 모바일 기본 nav 열림 여부 false
  const [isOpen, setIsOpen] = useState(false); // 어떤 nav든 열리면 true
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false); // 할 일 모달 열림 여부
  const [currentPageLabel, setCurrentPageLabel] = useState('대시보드');
  const pathname = usePathname();
  const hasMounted = useRef(false);
  const [isFullyOpen, setIsFullyOpen] = useState(true);

  const handleTodoModalOpen = () => {
    setIsTodoModalOpen(true);
  };

  const handleNavButtonClick = (widthType?: widthType) => {
    if (widthType === 'desktop') {
      setIsNavOpen(!isNavOpen);
    }
    if (widthType === 'mobile') {
      setIsMobileNavOpen(!isMobileNavOpen);
    }
  };

  useEffect(() => {
    if (isMobileNavOpen) {
      // nav open시 스크롤 막음
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }

    return () => {
      // cleanup 함수로 효과가 제대로 제거되도록 보장
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [isMobileNavOpen]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsFullyOpen(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsFullyOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (window.innerWidth < TABLET_BREAKPOINT) {
      setIsMobileNavOpen(true);
      setIsNavOpen(false);
    }
    if (hasMounted.current) {
      if (isNavOpen || isMobileNavOpen) setIsOpen(!isOpen);
    } else {
      hasMounted.current = true;
    }
    // isOpen은 의존성 배열에 넣지 않습니다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNavOpen, isMobileNavOpen]);

  // 페이지 이동 시
  useEffect(() => {
    // 첫 마운트 이후에만(페이지 이동시에만)실행
    if (hasMounted.current) {
      // 모바일, 태블릿에서 페이지 이동시 열려있던 nav를 닫음
      if (window.innerWidth < TABLET_BREAKPOINT) {
        setIsNavOpen(false);
      }
      setCurrentPageLabel(document.title.split('|')[0].trim());
    } else {
      hasMounted.current = true;
    }
  }, [pathname]);

  return (
    <>
      <section
        className={twMerge(
          clsx(
            'flex border-r-[1px]',
            isOpen
              ? 'h-screen flex-col flex-shrink-0 sm:w-[280px] divide-slate-200 transition-all ease-in-out duration-500'
              : 'flex-row sm:flex-col lg:flex-col p-4 px-[14px] items-center sm:w-16 lg:w-16'
          )
        )}
        style={{
          overflow: 'hidden',
          transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        {/* 로고 및 접기 버튼 영역 */}
        {/* close 시에만 보이는 nav */}
        <div
          className={`${isOpen ? 'hidden' : 'flex flex-row sm:flex-col lg:flex-col justify-center items-center gap-4'}`}
        >
          <Link href='/dashboard' className='hidden sm:flex lg:flex'>
            <ImageLogo />
          </Link>

          {/* 모바일에서만 작동하는 열기 버튼 */}
          <div className={'flex sm:hidden lg:hidden w-full flex-row gap-4 items-center justify-start'}>
            <Button
              className='flex justify-center items-center w-6 h-6 p-1 bg-white hover:bg-slate-100 active:bg-slate-300 rounded-lg'
              onClick={() => handleNavButtonClick('mobile')}
            >
              <IconHamburger />
            </Button>
            <h1 className='text-base font-semibold text-slate-900'>{currentPageLabel}</h1>
          </div>

          {/* 데스크탑에서만 작동하는 열기 버튼 */}
          <div
            className='hidden sm:grid lg:grid place-content-center hover:cursor-pointer w-6 h-6 p-1 bg-white hover:bg-slate-100 active:bg-slate-300 rounded-lg border-[1.5px] border-slate-400'
            onClick={() => handleNavButtonClick('desktop')}
          >
            <IconFold isFold={true} />
          </div>
        </div>

        {/* Open 시에만 보이는 nav */}
        <div
          className={`${
            isOpen
              ? 'flex flex-row justify-between items-center p-4'
              : 'hidden flex-row sm:flex-col lg:flex-col justify-center items-center space-y-4'
          }`}
        >
          <Link
            href='/dashboard'
            className={clsx(
              'flex items-center transition-opacity duration-500',
              isFullyOpen ? 'opacity-100' : 'opacity-0',
              isOpen ? 'visible' : 'invisible'
            )}
          >
            <ImageLogoWithText />
          </Link>

          {/* 모바일에서만 작동하는 닫기 버튼 */}
          <div
            className={clsx(
              'block sm:hidden lg:hidden',
              'transition-opacity duration-500',
              isFullyOpen ? 'opacity-100' : 'opacity-0',
              isOpen ? 'visible' : 'invisible'
            )}
          >
            <Button
              className='grid place-content-center w-6 h-6 p-1 bg-white hover:bg-slate-100 active:bg-slate-300 rounded-lg border-[1.5px] border-slate-400'
              onClick={() => handleNavButtonClick('mobile')}
            >
              <IconFold isFold={!isOpen} />
            </Button>
          </div>
          {/* 데스크탑에서만 작동하는 닫기 버튼 */}
          <div
            className={clsx(
              'hidden sm:hidden lg:block',
              'transition-opacity duration-500',
              isFullyOpen ? 'opacity-100' : 'opacity-0',
              isOpen ? 'visible' : 'invisible'
            )}
          >
            <Button
              className='grid place-content-center w-6 h-6 p-1 bg-white hover:bg-slate-100 active:bg-slate-300 rounded-lg border-[1.5px] border-slate-400'
              onClick={() => handleNavButtonClick('desktop')}
            >
              <IconFold isFold={!isOpen} />
            </Button>
          </div>
        </div>
        {/* 메뉴 영역(접힌 nav에서는 안보이는 영역) */}
        <div
          className={clsx(
            'transition-opacity duration-500',
            isFullyOpen ? 'opacity-100' : 'opacity-0',
            isOpen ? 'visible' : 'invisible w-0 h-0 lg:h-full'
          )}
        >
          {/* 유저 프로필 */}
          <Profile className='sm:border-none lg:border-none' />
          <div className='flex flex-col divide-y divide-slate-200'>
            {/* 대시보드 바로가기 및 새 할일 버튼 */}
            <div className='flex flex-row sm:flex-col lg:flex-col divide-y divide-slate-200 sm:border-none lg:border-none'>
              {/* 새 할 일 버튼 */}
              <div className='flex sm:justify-center items-center border-none px-4 py-6 order-2 sm:order-1 lg:order-1 ml-auto sm:w-full lg:w-full'>
                <AddTodoButton
                  className={
                    'sm:mx-0 lg:mx-0 gap-[2px] rounded-xl text-sm px-3 py-2 sm:py-3 lg:py-3 sm:px-6 lg:px-6 mt-0 w-[84px] sm:w-full lg:w-full'
                  }
                  onClick={handleTodoModalOpen}
                />
              </div>
              {/* 대시보드 바로가기 버튼 */}
              <div className='px-4 py-6 order-1 sm:order-2 lg:order-2'>
                <NavDashBoard />
              </div>
            </div>
            <div className='w-full flex justify-between px-4 py-6 gap-2 text-nowrap'>
              <NavAllTodos />
            </div>
            <NavGoal />
          </div>
        </div>
      </section>

      <TodoAddModal isOpen={isTodoModalOpen} onChangeIsOpen={setIsTodoModalOpen} />
    </>
  );
};

export default NavBarTemp;
