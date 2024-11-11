import { SVGProps } from 'react';

interface IconSuccessProps extends SVGProps<SVGSVGElement> {
  circleClassName?: string;
  pathClassName?: string;
}

const IconSuccess = ({ circleClassName, pathClassName, ...props }: IconSuccessProps) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 50 50'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    aria-labelledby='successTitle'
    {...props}
  >
    <circle className={circleClassName} cx='25' cy='25' r='25' fill='#25AE88' />
    <polyline
      className={pathClassName}
      points='38,15 22,33 12,25'
      stroke='#FFFFFF'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      fill='none'
    />
  </svg>
);

export default IconSuccess;
