import IconCheck from '@/public/icons/IconCheck';
import clsx from 'clsx';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

const NavAllTodos = ({ className }: { className?: string }) => {
  return (
    <div className={twMerge(clsx('w-full flex justify-between px-4 py-6 gap-2 text-nowrap', className))}>
      <Link href='/todos' className='flex gap-2 w-full'>
        <div className='w-6 h-6 flex justify-center items-center'>
          <IconCheck stroke='black' />
        </div>
        <div className='flex-grow flex-col'>
          <div className='text-lg font-medium text-slate-800'>모든 할 일</div>
        </div>
      </Link>
    </div>
  );
};
export default NavAllTodos;
