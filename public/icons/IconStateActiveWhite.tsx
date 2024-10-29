import { SVGProps } from 'react';

export const IconStateActiveWhite = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24' {...props}>
      <rect width='18' height='18' x='3' y='3' fill='#fff' rx='6' />
      <path
        stroke='#3182F6'
        d='m7 11.625 3.11 3.11a.375.375 0 0 0 .53 0L16.375 9'
        strokeLinecap='round'
        strokeWidth='2'
      />
    </svg>
  );
};
