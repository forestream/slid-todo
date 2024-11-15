import IconCheck from '@/public/icons/IconCheck';
import Link from 'next/link';

const NavAllTodos = () => {
  return (
    <Link href='/todos' className='flex gap-2 w-full'>
      <div className='w-6 h-6 flex justify-center items-center' aria-hidden='true'>
        <IconCheck stroke='black' />
      </div>
      <span className='flex-grow text-lg font-medium text-slate-800'>모든 할 일</span>
    </Link>
  );
};
export default NavAllTodos;
