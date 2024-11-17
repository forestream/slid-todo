'use client';
import { useEffect, useCallback, useRef } from 'react';
import debounce from '../utils/debounce';
import { TABLET_BREAKPOINT } from '@/constants';

interface UseWindowResizeProps {
  setIsLeftNavOpen: (isOpen: boolean) => void;
}

export const useWindowResize = ({ setIsLeftNavOpen }: UseWindowResizeProps) => {
  const wasOverThreshold = useRef<boolean | null>(null);

  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    const isOverThreshold = width >= TABLET_BREAKPOINT;

    // 이전 상태와 현재 상태가 다를 때만 실행
    if (wasOverThreshold.current !== null && isOverThreshold !== wasOverThreshold.current) {
      setIsLeftNavOpen(isOverThreshold);
    }

    wasOverThreshold.current = isOverThreshold;
  }, [setIsLeftNavOpen]);

  useEffect(() => {
    // 초기 상태 설정
    const width = window.innerWidth;
    wasOverThreshold.current = width >= TABLET_BREAKPOINT;
    setIsLeftNavOpen(wasOverThreshold.current);

    const debouncedHandleResize = debounce(handleResize, 200);
    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, [handleResize, setIsLeftNavOpen]);
};
