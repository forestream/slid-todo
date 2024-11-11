import { SVGProps } from 'react';

interface IconErrorProps extends SVGProps<SVGSVGElement> {
  circleClassName?: string;
  pathClassName?: string;
}

const IconError = ({ circleClassName, pathClassName, ...props }: IconErrorProps) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 50 50'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    aria-labelledby='errorTitle'
    {...props}
  >
    <title id='errorTitle'>Error Icon</title>
    <circle className={circleClassName} cx='25' cy='25' r='25' fill='#D75A4A' />
    <polyline
      className={pathClassName}
      points='16,34 25,25 34,16'
      stroke='#FFFFFF'
      strokeWidth='2'
      strokeLinecap='round'
      fill='none'
    />
    <polyline
      className={pathClassName}
      points='16,16 25,25 34,34'
      stroke='#FFFFFF'
      strokeWidth='2'
      strokeLinecap='round'
      fill='none'
    />
  </svg>
);

export default IconError;
