export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const fadeInLeft = {
  initial: {
    opacity: 0,
    x: -70,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
    },
  },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 70 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
    },
  },
};

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const navVariants = {
  open: {
    width: '280px',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 30,
      mass: 1.2,
    },
  },
  closed: {
    width: '64px',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 30,
      mass: 1.2,
    },
  },
};

export const navContentVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
      delay: 0.1,
    },
  },
  closed: {
    opacity: 0,
    x: -20,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
};
