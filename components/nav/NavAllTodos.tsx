import IconCheck from '@/public/icons/IconCheck';
import Link from 'next/link';

const NavAllTodos = () => {
  return (
    <div className='w-full flex justify-between px-4 py-6 gap-2 text-nowrap'>
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
