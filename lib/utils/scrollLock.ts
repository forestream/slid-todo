let scrollPosition = 0;

export const lockScroll = () => {
  if (typeof window === 'undefined') return;

  scrollPosition = window.scrollY;

  const body = document.body;
  body.style.overflow = 'hidden';
  body.style.position = 'fixed';
  body.style.top = `-${scrollPosition}px`;
  body.style.width = '100%';
};

export const unlockScroll = () => {
  if (typeof window === 'undefined') return;

  const body = document.body;
  body.style.removeProperty('overflow');
  body.style.removeProperty('position');
  body.style.removeProperty('top');
  body.style.removeProperty('width');

  window.scrollTo(0, scrollPosition);
};
