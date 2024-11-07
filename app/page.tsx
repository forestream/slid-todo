'use client';

import SectionContainer from '@/components/landingPage/SectionContainer';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import FirstSection from '@/components/landingPage/FirstSection';
import SecondSection from '@/components/landingPage/SecondSection';
import ThirdSection from '@/components/landingPage/ThirdSection';
import FourthSection from '@/components/landingPage/FourthSection';

export interface SectionProps {
  isVisible: boolean;
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = 4;
  const throttleDelay = 500;
  const lastScrollTime = useRef(0);

  const handleScroll = useCallback(
    (direction: number) => {
      setCurrentPage((prevPage) => {
        if (direction > 0) {
          return Math.min(prevPage + 1, pageCount - 1);
        } else {
          return Math.max(prevPage - 1, 0);
        }
      });
    },
    [pageCount]
  );

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      const currentTime = new Date().getTime();
      if (currentTime - lastScrollTime.current >= throttleDelay) {
        lastScrollTime.current = currentTime;
        handleScroll(event.deltaY);
      }
    };

    window.addEventListener('wheel', onWheel);
    return () => window.removeEventListener('wheel', onWheel);
  }, [handleScroll, throttleDelay]);

  return (
    <div className='relative h-screen w-full overflow-hidden'>
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
        <SectionContainer index={1}>
          <SecondSection isVisible={currentPage === 1} />
        </SectionContainer>
        <SectionContainer index={2}>
          <ThirdSection isVisible={currentPage === 2} />
        </SectionContainer>
        <SectionContainer index={3}>
          <FourthSection isVisible={currentPage === 3} />
        </SectionContainer>

        {/* 나머지 섹션들도 비슷한 방식으로 구현... */}
      </div>

      {/* Page Indicator */}
      <div className='absolute top-1/2 right-4 flex-col space-y-2'>
        {Array.from({ length: pageCount }, (_, i) => (
          <div
            onClick={() => setCurrentPage(i)}
            key={i}
            className={`h-3 w-3 rounded-full ${i === currentPage ? 'bg-black' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
}
