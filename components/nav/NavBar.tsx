'use client';
import { ImageLogoWithText } from '@/public/images/ImageLogoWithText';
import { IconFold } from '@/public/icons/IconFold';
import Link from 'next/link';
import Profile from './NavProfile';
import NavGoal from './NavGoal';
import { useRef, useState } from 'react';
import TodoAddModal from '../modal/todoModal/TodoAddModal';
import NavAllTodos from './NavAllTodos';
import AddTodoButton from './AddTodoButton';
import { IconDashboardSmall } from '@/public/icons/IconDashboardSmall';
import Button from '../common/ButtonSlid';
import { ImageLogo } from '@/public/images/ImageLogo';

const NavBar = () => {
  const modalRef = useRef<HTMLButtonElement>(null);
  const [isNavFolded, setIsNavFolded] = useState(false);

  const handleModalOpen = () => {
    modalRef.current?.click();
  };

  const handleFoldButtonClick = () => {
    console.log('fold clicked');
    setIsNavFolded(!isNavFolded);
  };

  return (
    <>
      {isNavFolded ? (
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
      ) : (
        <div className='flex-shrink-0 w-screen h-screen flex-col sm:w-[280px] divide-slate-200 sm:border-r-[1px]'>
          <nav className='flex-col w-full h-full'>
            <div className='flex justify-between items-center p-4'>
              <Link className='py-2 px-[5px]' href='/dashboard'>
                <ImageLogoWithText />
              </Link>
              <Button
                className='flex justify-center items-center sm:block w-6 h-6 p-1 bg-white hover:bg-slate-100 active:bg-slate-300  rounded-lg border-[1.5px] border-slate-400'
                onClick={handleFoldButtonClick}
              >
                <IconFold isFold={false} />
              </Button>
            </div>
            <div className='flex flex-col divide-y divide-slate-200'>
              <Profile className='sm:border-none lg:border-none' />
              {/* 대시보드 라벨과 새 할일 버튼 */}
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
                  <Link href='/dashboard' className='flex gap-2 w-full'>
                    <div className='w-6 h-6 flex justify-center items-center'>
                      <IconDashboardSmall />
                    </div>
                    <div className='flex-grow flex-col'>
                      <div className='text-lg font-medium text-slate-800'>대시보드</div>
                    </div>
                  </Link>
                </div>
              </div>
              <NavAllTodos />
              <NavGoal />
            </div>
          </nav>
        </div>
      )}

      <TodoAddModal ref={modalRef} />
    </>
  );
};

export default NavBar;
