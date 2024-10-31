'use client';

import Button from '@/components/common/ButtonSlid';
import SectionContainer from '@/components/landingPage/SectionContainer';
import Link from 'next/link';
import React, { useState, useEffect, useCallback, useRef } from 'react';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = 4;
  const throttleDelay = 500; // 쓰로틀링 딜레이 시간 (500ms)
  const lastScrollTime = useRef(0); // 마지막 스크롤 시간을 저장하는 useRef

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
        {/* Page 1 */}
        <SectionContainer index={0}>
          <div className='w-full h-full flex flex-col justify-center'>
            <h1 className='lg:text-6xl text-4xl font-bold mb-10'>당신의 동료 SlidToDo</h1>
            <h2 className='lg:text-4xl text-2xl font-bold mb-10'>효율적인 목표 관리와 체계적인 할 일 관리</h2>
            <p className='lg:text-2xl mb-10  '>
              SlidToDo는 목표 설정과 할 일 관리에 필요한 모든 기능을 제공합니다. 목표부터 세부적인 할 일과 노트까지
              체계적으로 관리하여 효율적인 작업 흐름을 만들어 보세요.
            </p>
            <div className='flex space-x-4'>
              <Link href={'/login'}>
                <Button className='lg:w-48 lg:h-14'>시작하기</Button>
              </Link>
              <Link href={'/signup'}>
                <Button className='lg:w-48 lg:h-14' variant='outlined'>
                  회원가입
                </Button>
              </Link>
            </div>
          </div>
          <div className='w-[500px] h-full flex justify-center items-center'>이미지 위치</div>
        </SectionContainer>

        {/* Page 2 */}
        <SectionContainer index={1}>
          <div className='w-[500px] h-full flex justify-center items-center'>이미지 위치</div>
          <div className='w-full h-full flex flex-col justify-center'>
            <h2 className='text-4xl font-bold'>할 일 기능</h2>
            <p className='mt-4 lg:text-xl'>
              각 할 일에는 관련 링크와 파일을 저장할 수 있으며, 필요한 노트를 추가해 더 자세한 내용을 기록할 수
              있습니다. 업무에 필요한 모든 자료를 한 곳에 정리해보세요.
            </p>
          </div>
        </SectionContainer>

        {/* Page 3 */}
        <SectionContainer index={2}>
          <div className='w-full h-full flex flex-col justify-center'>
            <h2 className='text-4xl font-bold'>목표 달성 현황</h2>
            <p className='mt-4 lg:text-xl'>
              설정한 목표의 달성률을 직관적으로 확인할 수 있습니다. 할 일이 완료될 때마다 목표의 이미지로 달성률이
              시각화됩니다.
            </p>
          </div>
          <div className='w-[500px] h-full flex justify-center items-center'>이미지 위치</div>
        </SectionContainer>

        {/* Page 4 */}
        <SectionContainer index={3}>
          <div className='w-[500px] h-full flex justify-center items-center'>이미지 위치</div>
          <div className='w-full h-full flex flex-col justify-center'>
            <h2 className='text-4xl font-bold'>노트 작성과 인베드 기능</h2>
            <p className='mt-4 lg:text-xl'>
              할 일마다 1:1로 연결된 노트에 더 자세한 내용을 기록할 수 있습니다. 유연한 인베드 기능으로 참고할 외부
              자료나 링크를 편하게 참조해 작업 효율성을 높여보세요.
            </p>
          </div>
        </SectionContainer>
      </div>
      {/* Page Indicator */}
      <div className='absolute top-1/2 right-4 flex-col space-y-2'>
        {Array.from({ length: pageCount }, (_, i) => (
          <div
            onClick={() => {
              setCurrentPage(i);
            }}
            key={i}
            className={`h-3 w-3 rounded-full ${i === currentPage ? 'bg-black' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
}
