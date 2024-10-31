'use client';
import { ImageLogoWithText } from '@/public/images/ImageLogoWithText';
import { IconFold } from '@/public/icons/IconFold';
import { IconPlusSmall } from '@/public/icons/IconPlusSmall';
import Link from 'next/link';
import Profile from './NavProfile';
import NavDashBoard from './NavDashBoard';
import NavGoal from './NavGoal';
import ButtonSlid from '../common/ButtonSlid';
import { SetStateAction, useRef, useState } from 'react';
import TodoAddModal from '../modal/todoModal/TodoAddModal';
import InputSlid from '../common/InputSlid';
import { useAddGoalMutation } from '@/lib/hooks/useAddGoalMutation';

const NavBar = () => {
  const modalRef = useRef<HTMLButtonElement>(null);
  const [isGoalInputVisible, setIsGoalInputVisible] = useState(false);
  const [goalInputValue, setGoalInputValue] = useState('· ');
  const addGoal = useAddGoalMutation();
  const handleModalOpen = () => {
    modalRef.current?.click();
  };
  const handleAddGoalButtonClick = () => {
    setIsGoalInputVisible(!isGoalInputVisible);
  };
  const handleInputChange = (e: { target: { value: SetStateAction<string> } }) => {
    setGoalInputValue(e.target.value);
  };

  const handleGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Goal submitted:', goalInputValue);
    addGoal.mutate({ updates: { title: goalInputValue.slice(1) } });
    setIsGoalInputVisible(false);
    setGoalInputValue('· ');
  };

  return (
    <>
      <div className='w-screen h-screen flex-col sm:w-[280px] divide-slate-200 sm:border-r-[1px]'>
        <nav className='flex-col w-full h-full'>
          <div className='flex justify-between items-center pt-4'>
            <Link className='py-2 px-[5px] ml-4' href='/dashboard'>
              <ImageLogoWithText />
            </Link>
            <button className='hidden sm:visible lg:visible w-6 h-6 mr-6 bg-white rounded-lg border-[1.5px] border-slate-400 sm:grid lg:grid place-items-center'>
              <IconFold />
            </button>
          </div>
          <div className='flex-col divide-y divide-slate-200'>
            <Profile />
            <div className='hidden sm:flex lg:flex items-center border-none w-full justify-center mb-6'>
              <ButtonSlid onClick={handleModalOpen} className='gap-[2px] w-[232px]'>
                <IconPlusSmall />
                <span>새 할 일</span>
              </ButtonSlid>
            </div>
            <NavDashBoard />
            <NavGoal />
            <div className='flex-col hidden sm:flex lg:flex items-center border-none w-full justify-center mb-6'>
              {isGoalInputVisible && (
                <div className='w-full flex items-center'>
                  <form onSubmit={handleGoalSubmit} className='w-full'>
                    <InputSlid
                      type='text'
                      inputClassName='flex p-2 text-sm font-medium bg-white'
                      value={goalInputValue}
                      onChange={handleInputChange}
                    />
                  </form>
                </div>
              )}

              <ButtonSlid onClick={handleAddGoalButtonClick} variant='outlined' className='gap-[2px] w-[232px]'>
                <IconPlusSmall stroke='#3B82F6' />
                <span>새 목표</span>
              </ButtonSlid>
            </div>
          </div>
        </nav>
      </div>
      <TodoAddModal ref={modalRef} />
    </>
  );
};
export default NavBar;
