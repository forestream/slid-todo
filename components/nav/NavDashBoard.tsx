import { IconDashboardSmall } from '@/public/icons/IconDashboardSmall';
import Link from 'next/link';
// import AddTodoButton from './AddTodoButton';

const NavDashBoard = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <div className='w-full flex justify-between px-4 py-6 gap-2 text-nowrap'>
        <Link href='/dashboard' className='flex gap-2 w-full'>
          <div className='w-6 h-6 flex justify-center items-center'>
            <IconDashboardSmall />
          </div>
          <div className='flex-grow flex-col'>
            <div className='text-lg font-medium text-slate-800'>대시보드</div>
          </div>
        </Link>
        {/* <div className='flex items-center sm:hidden lg:hidden'>
          <AddTodoButton className='gap-[2px] rounded-xl text-sm w-[84px] px-3 py-2' />
        </div> */}
      </div>
    </div>
  );
};
export default NavDashBoard;
