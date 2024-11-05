import { SVGProps } from 'react';

interface IconEditTodoProps extends SVGProps<SVGSVGElement> {
  pathClassName?: string;
}

const IconEditTodo = ({ pathClassName, ...props }: IconEditTodoProps) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 1024 1024'
    xmlns='http://www.w3.org/2000/svg'
    fill='#000000'
    aria-labelledby='EditTodoIconTitle'
    {...props}
  >
    <title id='EditTodoIconTitle'>수정하기</title>
    <path
      d='M930.56 192l-138.56-133.12A91.84 91.84 0 0 0 723.52 32a96 96 0 0 0-67.2 29.44L124.48 615.04a32 32 0 0 0-5.76 8.96V628.8L32 947.84a32 32 0 0 0 32 40 32 32 0 0 0 9.28 0l314.88-96h4.48a32 32 0 0 0 8.64-6.08l176.96-184.32a32 32 0 0 0-46.08-44.16l-155.2 160L192 636.48 704 105.92a32 32 0 0 1 22.4-9.92 33.92 33.92 0 0 1 22.72 8.96l138.56 133.12a32 32 0 0 1 0 45.12l-23.68 23.04A32 32 0 0 0 911.04 352l22.08-23.04A96 96 0 0 0 930.56 192zM108.8 908.48l55.68-210.24 152.32 146.24z'
      className={pathClassName}
      fill='#231815'
    />
    <path
      d='M688.32 462.72l-66.56 69.12A32 32 0 1 0 668.16 576L736 507.2a32 32 0 0 0-46.08-44.16zM822.72 369.92a32 32 0 0 0-45.12 0 32 32 0 0 0-7.04 10.56A32 32 0 0 0 777.6 416a32 32 0 0 0 22.4 9.28 32 32 0 0 0 12.48-2.24 32 32 0 0 0 10.24-7.04 32 32 0 0 0 7.04-34.88 38.4 38.4 0 0 0-7.04-11.2z'
      className={pathClassName}
      fill='#231815'
    />
  </svg>
);

export default IconEditTodo;
