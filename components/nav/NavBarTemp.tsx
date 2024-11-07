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
import { SheetContent, SheetProvider, SheetTrigger } from '../common/Sheet';

type widthType = 'mobile' | 'tablet' | 'desktop';

const NavBarTemp = () => {
  const [isNavOpen, setIsNavOpen] = useState(true); //데스크탑 기본 nav 열림 여부
  const [isSheetNavOpen, setIsSheetNavOpen] = useState(false); // 모바일, 태블릿 nav 왼쪽 시트 열림 여부
  const [isOpen, setIsOpen] = useState(true);
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false); // 할 일 모달 열림 여부
  const [currentPageLabel, setCurrentPageLabel] = useState('대시보드');
  const pathname = usePathname();
  const hasMounted = useRef(false);
  const [isFullyOpen, setIsFullyOpen] = useState(false);

  const handleTodoModalOpen = () => {
    setIsTodoModalOpen(true);
  };

  const handleNavButtonClick = (widthType?: widthType) => {
    if (widthType === 'desktop' || widthType === 'mobile') {
      setIsNavOpen(!isNavOpen);
    } else {
      setIsSheetNavOpen(!isSheetNavOpen);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  // 사이드바가 열리거나 닫힌 후 내부 콘텐츠의 애니메이션을 관리하기 위해 useEffect 사용
  useEffect(() => {
    if (isOpen) {
      // 사이드바가 열리기 시작한 후 약간 지연 후 내부 콘텐츠를 표시
      const timer = setTimeout(() => {
        setIsFullyOpen(true);
      }, 100); // 100ms 지연
      return () => clearTimeout(timer);
    } else {
      // 사이드바가 닫히면 내부 콘텐츠 숨김
      setIsFullyOpen(false);
    }
  }, [isOpen]);

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

  useEffect(() => {
    setIsOpen(isNavOpen || isSheetNavOpen);
  }, [isNavOpen, isSheetNavOpen]);

  const NavHeader = () => {
    return (
      <>
        {/* close 시에만 보이는 nav */}
        <div
          className={`${isOpen ? 'hidden' : 'flex flex-row sm:flex-col lg:flex-col justify-center items-center gap-4'}`}
        >
          <Link className='' href='/dashboard'>
            <ImageLogo />
          </Link>

          {/* 모바일에서만 작동하는 열기 버튼 */}
          <div className={'flex sm:hidden lg:hidden  w-full flex-row gap-4 items-center justify-start'}>
            <Button
              className='flex justify-center items-center w-6 h-6 p-1 bg-white hover:bg-slate-100 active:bg-slate-300 rounded-lg'
              onClick={() => handleNavButtonClick('mobile')}
            >
              <IconHamburger />
            </Button>
            <h1 className='text-base font-semibold text-slate-900'>{currentPageLabel}</h1>
          </div>

          {/* 태블릿에서만 작동하는 열기 버튼 */}
          <div className='hidden sm:block lg:hidden'>
            <Button
              className='flex justify-center items-center w-6 h-6 p-1 bg-white hover:bg-slate-100 active:bg-slate-300 rounded-lg border-[1.5px] border-slate-400'
              onClick={() => handleNavButtonClick('tablet')}
            >
              <IconFold isFold={true} />
            </Button>
          </div>
          {/* 데스크탑에서만 작동하는 열기 버튼 */}
          <div
            className='grid place-content-center w-6 h-6 p-1 bg-white hover:bg-slate-100 active:bg-slate-300 rounded-lg border-[1.5px] border-slate-400'
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
          <Link href='/dashboard' className={'flex items-center'}>
            <ImageLogoWithText />
          </Link>

          {/* 태블릿/모바일에서만 작동하는 닫기 버튼 */}
          <div className='flex sm:block lg:hidden'>
            <Button
              className='grid place-content-center w-6 h-6 p-1 bg-white hover:bg-slate-100 active:bg-slate-300 rounded-lg border-[1.5px] border-slate-400'
              onClick={() => handleNavButtonClick('tablet')}
            >
              <IconFold isFold={!isSheetNavOpen} />
            </Button>
          </div>
          {/* 데스크탑에서만 작동하는 닫기 버튼 */}
          <div className='hidden sm:hidden lg:block'>
            <Button
              className='grid place-content-center w-6 h-6 p-1 bg-white hover:bg-slate-100 active:bg-slate-300 rounded-lg border-[1.5px] border-slate-400'
              onClick={() => handleNavButtonClick('desktop')}
            >
              <IconFold isFold={!isNavOpen} />
            </Button>
          </div>
        </div>
      </>
    );
  };

  const NavContent = () => {
    return (
      <>
        {/* 로고 및 접기 버튼 영역 */}
        <NavHeader />
        {/* 메뉴 영역(접힌 nav에서는 안보이는 영역) */}
        <div
          className={clsx(
            'transition-opacity duration-1000',
            isFullyOpen ? 'opacity-100' : 'opacity-0',
            isOpen ? 'visible' : 'invisible' // 콘텐츠 보임 여부 제어
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
      </>
    );
  };

  // 모바일,태블릿용 nav
  const NavWithSheet = () => (
    <SheetProvider isOpen={isSheetNavOpen} onChangeIsOpen={setIsSheetNavOpen}>
      <SheetTrigger>
        {/* 태블릿 */}
        <div className='hidden sm:flex lg:hidden flex-row sm:flex-col lg:flex-col justify-center items-center gap-4'>
          <Link className='' href='/dashboard'>
            <ImageLogo />
          </Link>
          <div
            className='grid place-content-center w-6 h-6 p-1 bg-white hover:bg-slate-100 active:bg-slate-300 rounded-lg border-[1.5px] border-slate-400'
            onClick={() => handleNavButtonClick('tablet')}
          >
            <IconFold isFold={true} />
          </div>
        </div>
        {/* 모바일 */}
        <div className={'flex sm:hidden lg:hidden  w-full flex-row gap-4 items-center justify-start'}>
          <div
            className='flex justify-center items-center w-6 h-6 p-1 bg-white hover:bg-slate-100 active:bg-slate-300 rounded-lg'
            onClick={() => handleNavButtonClick('mobile')}
          >
            <IconHamburger />
          </div>
          <h1 className='text-base font-semibold text-slate-900'>{currentPageLabel}</h1>
        </div>
      </SheetTrigger>
      <SheetContent position='left' className='sm:w-[280px] p-0'>
        <NavContent />
      </SheetContent>
    </SheetProvider>
  );

  return (
    <>
      <section
        className={twMerge(
          clsx(
            'flex border-r-[1px] h-screen',
            isOpen
              ? 'flex-col flex-shrink-0 sm:w-[280px] divide-slate-200'
              : 'flex-row sm:flex-col lg:flex-col p-4 px-[14px] items-center w-16',
            isFullyOpen ? 'transition-all ease-in-out duration-1000' : 'transition-all ease-in-out duration-1000'
          )
        )}
        style={{
          overflow: 'hidden',
          transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)', // 부드러운 트랜지션
        }}
      >
        <div
          className={clsx(
            'block sm:block lg:hidden transition-opacity duration-500'
            // isFullyOpen ? 'opacity-100' : 'w-16'
          )}
        >
          <NavWithSheet />
        </div>
        {/* 데스크탑 화면일 때 Nav (NavContent) */}
        <div
          className={clsx(
            'hidden sm:hidden lg:block transition-opacity duration-500',
            isFullyOpen ? 'opacity-100' : 'w-8'
          )}
        >
          {/* 로고 및 접기 버튼 영역 */}
          {/* close 시에만 보이는 nav */}
          <div
            className={`${
              isOpen ? 'hidden' : 'flex flex-row sm:flex-col lg:flex-col justify-center items-center gap-4'
            }`}
          >
            <Link href='/dashboard'>
              <ImageLogo />
            </Link>

            {/* 모바일에서만 작동하는 열기 버튼 */}
            <div className={'flex sm:hidden lg:hidden  w-full flex-row gap-4 items-center justify-start'}>
              <Button
                className='flex justify-center items-center w-6 h-6 p-1 bg-white hover:bg-slate-100 active:bg-slate-300 rounded-lg'
                onClick={() => handleNavButtonClick('mobile')}
              >
                <IconHamburger />
              </Button>
              <h1 className='text-base font-semibold text-slate-900'>{currentPageLabel}</h1>
            </div>

            {/* 태블릿에서만 작동하는 열기 버튼 */}
            <div className='hidden sm:block lg:hidden'>
              <Button
                className='flex justify-center items-center w-6 h-6 p-1 bg-white hover:bg-slate-100 active:bg-slate-300 rounded-lg border-[1.5px] border-slate-400'
                onClick={() => handleNavButtonClick('tablet')}
              >
                <IconFold isFold={true} />
              </Button>
            </div>
            {/* 데스크탑에서만 작동하는 열기 버튼 */}
            <div
              className='grid place-content-center w-6 h-6 p-1 bg-white hover:bg-slate-100 active:bg-slate-300 rounded-lg border-[1.5px] border-slate-400'
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
                'flex items-center transition-opacity duration-1000',
                isFullyOpen ? 'opacity-100' : 'opacity-0',
                isOpen ? 'visible' : 'invisible' // 콘텐츠 보임 여부 제어
              )}
            >
              <ImageLogoWithText />
            </Link>

            {/* 태블릿/모바일에서만 작동하는 닫기 버튼 */}
            <div className='flex sm:block lg:hidden'>
              <Button
                className='grid place-content-center w-6 h-6 p-1 bg-white hover:bg-slate-100 active:bg-slate-300 rounded-lg border-[1.5px] border-slate-400'
                onClick={() => handleNavButtonClick('tablet')}
              >
                <IconFold isFold={!isSheetNavOpen} />
              </Button>
            </div>
            {/* 데스크탑에서만 작동하는 닫기 버튼 */}
            <div
              className={clsx(
                'hidden sm:hidden lg:block',
                'transition-opacity duration-1000',
                isFullyOpen ? 'opacity-100' : 'opacity-0',
                isOpen ? 'visible' : 'invisible' // 콘텐츠 보임 여부 제어
              )}
            >
              <Button
                className='grid place-content-center w-6 h-6 p-1 bg-white hover:bg-slate-100 active:bg-slate-300 rounded-lg border-[1.5px] border-slate-400'
                onClick={() => handleNavButtonClick('desktop')}
              >
                <IconFold isFold={!isNavOpen} />
              </Button>
            </div>
          </div>
          {/* 메뉴 영역(접힌 nav에서는 안보이는 영역) */}
          <div
            className={clsx(
              'transition-opacity duration-1000',
              isFullyOpen ? 'opacity-100' : 'opacity-0',
              isOpen ? 'visible' : 'invisible' // 콘텐츠 보임 여부 제어
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
        </div>
      </section>

      <TodoAddModal isOpen={isTodoModalOpen} onChangeIsOpen={setIsTodoModalOpen} />
    </>
  );
};

export default NavBarTemp;
