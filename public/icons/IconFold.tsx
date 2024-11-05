import React, { SVGProps } from 'react';

interface IconFoldProps {
  props?: SVGProps<SVGSVGElement>;
  isFold: boolean;
}

export const IconFold = ({ props, isFold }: IconFoldProps) => {
  return isFold ? (
    <svg xmlns='http://www.w3.org/2000/svg' width='11' height='10' viewBox='0 0 11 10' fill='none' {...props}>
      <path
        d='M6.39258 1L10.0176 4.625L6.39258 8.25'
        stroke='#94A3B8'
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M1.25 1L4.875 4.625L1.25 8.25'
        stroke='#94A3B8'
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ) : (
    <svg xmlns='http://www.w3.org/2000/svg' width='11' height='10' viewBox='0 0 11 10' fill='none' {...props}>
      <path
        d='M4.875 1L1.25 4.625L4.875 8.25'
        stroke='#94A3B8'
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10.0176 1L6.39258 4.625L10.0176 8.25'
        stroke='#94A3B8'
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
