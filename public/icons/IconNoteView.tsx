import { SVGProps } from 'react';

interface IconNoteViewProps extends SVGProps<SVGSVGElement> {
  circleClassName?: string;
  pathClassName?: string;
}

const IconNoteView = ({ circleClassName, pathClassName, ...props }: IconNoteViewProps) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    aria-labelledby='noteViewTitle'
    {...props}
  >
    <title id='noteViewTitle'>노트 보기</title>
    <circle className={circleClassName} cx='12' cy='12' r='12' fill='#FF9F43' />
    <rect x='7.5' y='6.90039' width='9' height='10.3846' rx='1.38462' fill='#ffffff' />
    <path
      className={pathClassName}
      d='M9.57715 10.0156H14.4233'
      stroke='#FF9F43'
      strokeWidth='0.969231'
      strokeLinecap='round'
    />
    <path
      className={pathClassName}
      d='M9.57715 12.0918H14.4233'
      stroke='#FF9F43'
      strokeWidth='0.969231'
      strokeLinecap='round'
    />
    <path
      className={pathClassName}
      d='M9.57715 14.1699H14.4233'
      stroke='#FF9F43'
      strokeWidth='0.969231'
      strokeLinecap='round'
    />
  </svg>
);

export default IconNoteView;
