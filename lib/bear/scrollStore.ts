import { create } from 'zustand';

type ScrollStore = {
  isScrollLocked: boolean;
  openModalCount: number;
  lockScroll: () => void;
  unlockScroll: () => void;
  incrementModalCount: () => void;
  decrementModalCount: () => void;
};

let scrollPosition = 0;

const useScrollStore = create<ScrollStore>((set, get) => ({
  isScrollLocked: false,
  openModalCount: 0,
  lockScroll: () => {
    if (typeof window === 'undefined') return;

    scrollPosition = window.scrollY;
    const body = document.body;

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollPosition}px`;
    body.style.width = '100%';

    set({ isScrollLocked: true });
  },
  unlockScroll: () => {
    if (typeof window === 'undefined') return;

    const body = document.body;

    body.style.removeProperty('overflow');
    body.style.removeProperty('position');
    body.style.removeProperty('top');
    body.style.removeProperty('width');

    window.scrollTo(0, scrollPosition);
    set({ isScrollLocked: false });
  },
  incrementModalCount: () => {
    const currentCount = get().openModalCount;
    if (currentCount === 0) {
      get().lockScroll();
    }
    set({ openModalCount: currentCount + 1 });
  },
  decrementModalCount: () => {
    const currentCount = get().openModalCount;
    if (currentCount <= 1) {
      get().unlockScroll();
    }
    set({ openModalCount: Math.max(0, currentCount - 1) });
  },
}));

export default useScrollStore;
