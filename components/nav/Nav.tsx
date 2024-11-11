'use client';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { usePathname } from 'next/navigation';
import { SheetContent, SheetProvider, SheetTrigger } from '../common/Sheet';
import TodoAddModal from '../modal/todoModal/TodoAddModal';
import NavHeader, { MobileTriggerNavHeader, TabletTriggerNavHeader } from './NavHeader';
import NavContent from './NavContent';

type widthType = 'mobile' | 'tablet' | 'desktop';

const Nav = () => {
  const [isDesktopNavOpen, setIsDesktopNavOpen] = useState(true); // 데스크탑용 nav 열림 여부
  const [isSheetOpen, setIsSheetOpen] = useState(false); // 모바일, 태블릿용 sheet nav 열림 여부
  const [isFullyOpen, setIsFullyOpen] = useState(true);
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false); // 할 일 모달 열림 여부
  const [currentPageLabel, setCurrentPageLabel] = useState('대시보드');
  const pathname = usePathname();
  const hasMounted = useRef(false);

  const handleTodoModalOpen = () => {
    setIsTodoModalOpen(true);
  };

  const handleNavToggleButtonClick = (widthType?: widthType) => {
    if (widthType === 'desktop') {
      setIsDesktopNavOpen(!isDesktopNavOpen);
    } else {
      setIsSheetOpen(!isSheetOpen);
    }
  };

  useEffect(() => {
    if (!isDesktopNavOpen || !isSheetOpen) {
      setIsFullyOpen(false);
    }
  }, [isDesktopNavOpen, isSheetOpen]);

  // 페이지 이동 시
  useEffect(() => {
    // 첫 마운트 이후에만(페이지 이동시에만)실행
    if (hasMounted.current) {
      setCurrentPageLabel(document.title.split('|')[0].trim());
    } else {
      hasMounted.current = true;
    }
  }, [pathname]);

  return (
    <>
      {/* 모바일/태블릿용 sheet nav */}
      <section
        className={clsx(
          'flex sm:flex lg:hidden flex-col border-r-[1px] flex-shrink-0 divide-slate-200',
          isSheetOpen ? 'h-screen' : 'h-auto'
        )}
      >
        <SheetProvider isOpen={isSheetOpen} onChangeIsOpen={setIsSheetOpen}>
          <SheetTrigger>
            <TabletTriggerNavHeader isSheetOpen={isSheetOpen} handleNavToggleButtonClick={handleNavToggleButtonClick} />
            <MobileTriggerNavHeader
              currentPageLabel={currentPageLabel}
              handleNavToggleButtonClick={handleNavToggleButtonClick}
            />
          </SheetTrigger>
          <SheetContent position='left' className={twMerge(clsx('sm:w-[280px] p-0'))}>
            <NavHeader
              isDesktopNavOpen={isDesktopNavOpen}
              isSheetOpen={isSheetOpen}
              handleNavToggleButtonClick={handleNavToggleButtonClick}
              currentPageLabel={currentPageLabel}
            />
            <NavContent handleTodoModalOpen={handleTodoModalOpen} />
          </SheetContent>
        </SheetProvider>
      </section>

      {/* 데스크탑 */}
      <motion.section
        initial={{ width: '280px' }}
        animate={{ width: isDesktopNavOpen ? '280px' : '64px' }}
        transition={{ duration: 0.1 }}
        className={twMerge(
          clsx('hidden sm:hidden lg:flex flex-col border-r-[1px] h-screen flex-shrink-0 divide-slate-200')
        )}
        onAnimationComplete={() => {
          if (isDesktopNavOpen) {
            setIsFullyOpen(true); // 애니메이션 완료 후 모두 다 펼쳐진 후에 하단 콘텐츠 보이기
          }
        }}
      >
        {/* 윗부분: 로고 및 열기/닫기 버튼 */}
        <NavHeader
          isDesktopNavOpen={isDesktopNavOpen}
          isSheetOpen={isSheetOpen}
          handleNavToggleButtonClick={handleNavToggleButtonClick}
        />

        {/* 아래부분: NavContent (사이드바가 모두 열렸을 때만 보임) */}
        {isDesktopNavOpen && isFullyOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className='w-full flex flex-col items-start'
          >
            <NavContent handleTodoModalOpen={handleTodoModalOpen} />
          </motion.div>
        )}
      </motion.section>
      <TodoAddModal isOpen={isTodoModalOpen} onChangeIsOpen={setIsTodoModalOpen} />
    </>
  );
};

export default Nav;
