'use client';

import SectionContainer from '@/components/landingPage/SectionContainer';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import FirstSection from '@/components/landingPage/FirstSection';
import SecondSection from '@/components/landingPage/SecondSection';
import ThirdSection from '@/components/landingPage/ThirdSection';
import FourthSection from '@/components/landingPage/FourthSection';
import FooterSection from '@/components/landingPage/FooterSection';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export interface SectionProps {
  isVisible: boolean;
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = 5;
  const throttleDelay = 500;
  const lastScrollTime = useRef(0);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const minSwipeDistance = 50;

  const handleScroll = useCallback(
    (direction: number) => {
      const currentTime = new Date().getTime();
      if (currentTime - lastScrollTime.current >= throttleDelay) {
        lastScrollTime.current = currentTime;
        setCurrentPage((prevPage) => {
          if (direction > 0) {
            return Math.min(prevPage + 1, pageCount - 1);
          } else {
            return Math.max(prevPage - 1, 0);
          }
        });
      }
    },
    [pageCount]
  );

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      handleScroll(event.deltaY);
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartY.current = event.touches[0].clientY;
    };

    const onTouchMove = (event: TouchEvent) => {
      // 스크롤 중에 기본 터치 동작 방지
      event.preventDefault();
    };

    const onTouchEnd = (event: TouchEvent) => {
      touchEndY.current = event.changedTouches[0].clientY;
      const swipeDistance = touchStartY.current - touchEndY.current;

      if (Math.abs(swipeDistance) >= minSwipeDistance) {
        handleScroll(swipeDistance);
      }
    };

    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.addEventListener('wheel', onWheel, { passive: false });
      mainElement.addEventListener('touchstart', onTouchStart);
      mainElement.addEventListener('touchmove', onTouchMove, { passive: false });
      mainElement.addEventListener('touchend', onTouchEnd);
    }

    return () => {
      if (mainElement) {
        mainElement.removeEventListener('wheel', onWheel);
        mainElement.removeEventListener('touchstart', onTouchStart);
        mainElement.removeEventListener('touchmove', onTouchMove);
        mainElement.removeEventListener('touchend', onTouchEnd);
      }
    };
  }, [handleScroll]);

  return (
    <main className='relative h-screen w-full overflow-hidden'>
      <div
        style={{
          transform: `translateY(-${currentPage * 100}vh)`,
          transition: 'transform 0.5s ease-in-out',
        }}
        className='absolute inset-0'
      >
        <SectionContainer index={0}>
          <FirstSection isVisible={currentPage === 0} />
        </SectionContainer>
        <SectionContainer index={1} classNameDiv='flex-col sm:flex-col items-center'>
          <SecondSection isVisible={currentPage === 1} />
        </SectionContainer>
        <SectionContainer index={2}>
          <ThirdSection isVisible={currentPage === 2} />
        </SectionContainer>
        <SectionContainer index={3}>
          <FourthSection isVisible={currentPage === 3} />
        </SectionContainer>
        <FooterSection index={4} />

        {/* 나머지 섹션들도 비슷한 방식으로 구현... */}
      </div>

      {/* Page Indicator */}
      <nav
        className='absolute top-1/2 -translate-y-1/2 right-12 flex-col space-y-2'
        role='navigation'
        aria-label='페이지 네비게이션'
      >
        {Array.from({ length: pageCount }, (_, i) => (
          <div
            onClick={() => setCurrentPage(i)}
            key={i}
            className={twMerge(
              clsx('h-3 w-3 rounded-full cursor-pointer', i === currentPage ? 'bg-black' : 'bg-gray-400')
            )}
            aria-label={`${i + 1}번째 페이지로 이동`}
            aria-current={i === currentPage ? 'page' : undefined}
          />
        ))}
      </nav>
    </main>
  );
}
