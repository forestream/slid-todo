'use client';
import { useState } from 'react';
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
import TodoAddModal from '../modal/todoModal/TodoAddModal';
import { SheetContent, SheetProvider, SheetTrigger } from '../common/Sheet';

const NavBarTablet = () => {
  const [isSheetNavOpen, setIsSheetNavOpen] = useState(false); // 모바일, 태블릿 nav 왼쪽 시트 열림 여부
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false); // 할 일 모달 열림 여부
  const handleNavButtonClick = () => {
    setIsSheetNavOpen(!isSheetNavOpen);
  };

  const handleTodoModalOpen = () => {
    setIsTodoModalOpen(true);
  };

  return (
    <>
      <SheetProvider isOpen={isSheetNavOpen} onChangeIsOpen={setIsSheetNavOpen}>
        <SheetTrigger>
          <div
            className={`${
              isSheetNavOpen
                ? 'flex flex-row justify-between items-center p-4'
                : 'hidden sm:flex lg:flex flex-col justify-center items-center space-y-4 p-4'
            }`}
          >
            <Link href='/dashboard' className={`${isSheetNavOpen ? 'py-2 px-[5px]' : 'flex items-center'}`}>
              {isSheetNavOpen ? <ImageLogoWithText /> : <ImageLogo />}
            </Link>
            <div
              className='flex justify-center items-center sm:block w-6 h-6 p-1 bg-white hover:bg-slate-100 active:bg-slate-300 rounded-lg border-[1.5px] border-slate-400'
              onClick={handleNavButtonClick}
            >
              <IconFold isFold={!isSheetNavOpen} />
            </div>
          </div>
        </SheetTrigger>
        <SheetContent position='left' className='sm:w-[280px] p-0'>
          <section
            className={twMerge(
              clsx(
                'flex flex-col border-r-[1px] h-screen transition-all ease-out duration-300',
                isSheetNavOpen ? 'flex-shrink-0 sm:w-[280px] divide-slate-200' : 'p-4 px-[14px] items-center'
              )
            )}
          >
            {/* 로고 및 접기 버튼 영역 */}
            <div
              className={`${
                isSheetNavOpen
                  ? 'flex flex-row justify-between items-center p-4'
                  : 'hidden sm:flex lg:flex flex-col justify-center items-center space-y-4'
              }`}
            >
              <Link href='/dashboard' className={`${isSheetNavOpen ? 'py-2 px-[5px]' : 'flex items-center'}`}>
                {isSheetNavOpen ? <ImageLogoWithText /> : <ImageLogo />}
              </Link>
              <div
                className='flex justify-center items-center sm:block w-6 h-6 p-1 bg-white hover:bg-slate-100 active:bg-slate-300 rounded-lg border-[1.5px] border-slate-400'
                onClick={handleNavButtonClick}
              >
                <IconFold isFold={!isSheetNavOpen} />
              </div>
            </div>
            {/* 메뉴 영역(접힌 nav에서는 안보이는 영역) */}
            <div className={isSheetNavOpen ? '' : 'opacity-0 w-0 h-0'}>
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
        </SheetContent>
      </SheetProvider>

      <TodoAddModal isOpen={isTodoModalOpen} onChangeIsOpen={setIsTodoModalOpen} />
    </>
  );
};

export default NavBarTablet;
