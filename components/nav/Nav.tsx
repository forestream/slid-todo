'use client';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { usePathname } from 'next/navigation';
import TodoAddModal from '../modal/todoModal/TodoAddModal';
import NavHeader from './NavHeader';
import NavContent from './NavContent';
import NavMobileHeader from './NavMobileHeader';

const Nav = () => {
  const [isLeftNavOpen, setIsLeftNavOpen] = useState(true); // 왼쪽 nav 열림 여부
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false); // 할 일 모달 열림 여부
  const [currentPageLabel, setCurrentPageLabel] = useState('대시보드');
  const pathname = usePathname();

  const handleTodoModalOpen = () => {
    setIsTodoModalOpen(true);
  };

  // 페이지 이동 시
  useEffect(() => {
    setCurrentPageLabel(document.title.split('|')[0].trim());
  }, [pathname]);

  return (
    <nav aria-label='사이드바 네비게이션 메뉴'>
      {/* 데스크탑 */}
      <motion.section
        initial={{ width: '280px' }}
        animate={{ width: isLeftNavOpen ? '280px' : '64px' }}
        transition={{ duration: 0.1 }}
        className={twMerge(
          clsx(
            'hidden sm:flex sm:sticky sm:top-0 sm:left-0 flex-col border-r-[1px] min-h-screen flex-shrink-0 divide-slate-200'
          )
        )}
      >
        {/* 윗부분: 로고 및 열기/닫기 버튼 */}
        <NavHeader isLeftNavOpen={isLeftNavOpen} handleNavToggleButtonClick={() => setIsLeftNavOpen(!isLeftNavOpen)} />
        {isLeftNavOpen && <NavContent handleTodoModalOpen={handleTodoModalOpen} />}
      </motion.section>
      {/* 모바일 헤더 */}
      <NavMobileHeader currentPageLabel={currentPageLabel} handleTodoModalOpen={handleTodoModalOpen} />
      <TodoAddModal isOpen={isTodoModalOpen} onChangeIsOpen={setIsTodoModalOpen} />
    </nav>
  );
};

export default Nav;
