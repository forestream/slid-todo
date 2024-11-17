'use client';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { usePathname } from 'next/navigation';
import TodoAddModal from '../modal/todoModal/TodoAddModal';
import NavHeader from './NavHeader';
import NavContent from './NavContent';
import NavMobileHeader from './NavMobileHeader';
import { useWindowResize } from '@/lib/hooks/useWindowResize';
import { navContentVariants, navVariants } from '@/lib/animations/variants';

const Nav = () => {
  const [isLeftNavOpen, setIsLeftNavOpen] = useState(true);
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
  const [currentPageLabel, setCurrentPageLabel] = useState('대시보드');
  const pathname = usePathname();
  useWindowResize({ setIsLeftNavOpen });

  const handleTodoModalOpen = () => {
    setIsTodoModalOpen(true);
  };

  useEffect(() => {
    setCurrentPageLabel(document.title.split('|')[0].trim());
  }, [pathname]);

  return (
    <nav aria-label='사이드바 네비게이션 메뉴' className='sticky top-0 z-10'>
      {/* 왼쪽 네브 (데스크탑, 테블릿) */}
      <motion.section
        initial='open'
        animate={isLeftNavOpen ? 'open' : 'closed'}
        variants={navVariants}
        className={twMerge(
          clsx(
            'hidden sm:flex sm:sticky sm:top-0 sm:left-0 flex-col border-r-[1px] min-h-screen flex-shrink-0 divide-slate-200 overflow-hidden'
          )
        )}
      >
        <NavHeader isLeftNavOpen={isLeftNavOpen} handleNavToggleButtonClick={() => setIsLeftNavOpen(!isLeftNavOpen)} />
        <AnimatePresence mode='wait'>
          {isLeftNavOpen && (
            <motion.div key='nav-content' variants={navContentVariants} initial='closed' animate='open' exit='closed'>
              <NavContent handleTodoModalOpen={handleTodoModalOpen} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
      {/* 위쪽네브 (모바일) */}
      <NavMobileHeader currentPageLabel={currentPageLabel} handleTodoModalOpen={handleTodoModalOpen} />
      {/* 할일 추가 모달 */}
      <TodoAddModal isOpen={isTodoModalOpen} onChangeIsOpen={setIsTodoModalOpen} />
    </nav>
  );
};

export default Nav;
