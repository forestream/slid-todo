'use client';
import { ImageLogoWithText } from '@/public/images/ImageLogoWithText';
import { IconFold } from '@/public/icons/IconFold';
import Link from 'next/link';
import Profile from './NavProfile';
import NavGoal from './NavGoal';
import { useRef } from 'react';
import TodoAddModal from '../modal/todoModal/TodoAddModal';
import NavAllTodos from './NavAllTodos';
import AddTodoButton from './AddTodoButton';
import { IconDashboardSmall } from '@/public/icons/IconDashboardSmall';

const NavBar = () => {
  const modalRef = useRef<HTMLButtonElement>(null);

  const handleModalOpen = () => {
    modalRef.current?.click();
  };

  return (
    <>
      <div className='flex-shrink-0 w-screen h-screen flex-col sm:w-[280px] divide-slate-200 sm:border-r-[1px]'>
        <nav className='flex-col w-full h-full'>
          <div className='flex justify-between items-center pt-4'>
            <Link className='py-2 px-[5px] ml-4' href='/dashboard'>
              <ImageLogoWithText />
            </Link>
            <button className='sm:block w-6 h-6 mr-6 bg-white rounded-lg border-[1.5px] border-slate-400 grid place-items-center'>
              <IconFold />
            </button>
          </div>
          <div className='flex flex-col divide-y divide-slate-200'>
            <Profile className='sm:border-none lg:border-none' />
            {/* 대시보드 라벨과 새 할일 버튼 */}
            <div className='flex flex-row sm:flex-col lg:flex-col divide-y divide-slate-200 sm:border-none lg:border-none'>
              {/* 새 할일 버튼 */}
              <div className='flex sm:justify-center items-center border-none px-4 py-6 order-2 sm:order-1 lg:order-1 ml-auto sm:w-full lg:w-full'>
                <AddTodoButton
                  className='mr-3 sm:mx-0 lg:mx-0 gap-[2px] rounded-xl text-sm px-3 py-2 sm:p-3 lg:p-3 sm:px-6 lg:px-6 mt-0 w-[84px] sm:w-full lg:w-full'
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
      <TodoAddModal ref={modalRef} />
    </>
  );
};

export default NavBar;
