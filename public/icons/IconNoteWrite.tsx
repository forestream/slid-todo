import { SVGProps } from 'react';

interface IconNoteWriteProps extends SVGProps<SVGSVGElement> {
  circleClassName?: string;
  pathClassName?: string;
}

const IconNoteWrite = ({ circleClassName, pathClassName, ...props }: IconNoteWriteProps) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    aria-labelledby='noteWriteTitle'
    {...props}
  >
    <title id='noteWriteTitle'>노트 작성하기 </title>
    <circle className={circleClassName} cx='12' cy='12' r='12' fill='#FF9F43' />
    <path
      className={pathClassName}
      d='M15.9375 8.76642C16.2136 8.28812 16.0498 7.67653 15.5715 7.40039L14.6974 6.89576C14.2191 6.61962 13.6075 6.78349 13.3314 7.26178L9.11674 14.5618C9.00321 14.7584 8.95998 14.9879 8.99417 15.2124L9.11579 16.011C9.21228 16.6445 9.8714 17.025 10.4683 16.7918L11.2207 16.4979C11.4322 16.4152 11.6093 16.2631 11.7228 16.0664L15.9375 8.76642Z'
      fill='#ffffff'
    />
  </svg>
);

export default IconNoteWrite;
