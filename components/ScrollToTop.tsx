'use client';

import debounce from '@/lib/utils/debounce';
import ScrollToTopIcon from '@/public/icons/IconScrollTop';
import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const documentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollTriggerPoint = viewportHeight * 0.5;

      if (documentHeight > viewportHeight && window.scrollY > scrollTriggerPoint) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const debouncedToggle = debounce(toggleVisibility, 150);

    toggleVisibility();

    window.addEventListener('scroll', debouncedToggle);
    window.addEventListener('resize', debouncedToggle);

    return () => {
      window.removeEventListener('scroll', debouncedToggle);
      window.removeEventListener('resize', debouncedToggle);
    };
  }, []);

  const scrollToTop = () => {
    setIsClicked(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setTimeout(() => setIsClicked(false), 500); // 애니메이션 후 상태 초기화
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out transform ${
            isClicked ? 'animate-bounce' : 'hover:scale-110'
          } focus:outline-none focus:ring-2 focus:ring-blue-500 z-50`}
          aria-label='맨 위로 스크롤'
        >
          <div className={`relative w-8 h-8 flex items-center justify-center ${isClicked ? 'animate-pulse' : ''}`}>
            <ScrollToTopIcon className='w-8 h-8 fill-blue-600' />
            <span
              className={`absolute inset-0 rounded-full blur-lg ${isClicked ? 'bg-blue-300/50' : 'bg-transparent'}`}
            ></span>
          </div>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
