import { IconDashboardSmall } from '@/public/icons/IconDashboardSmall';
import Link from 'next/link';

const NavDashBoard = () => {
  return (
    <Link href='/dashboard' className='flex gap-2 w-full'>
      <div className='w-6 h-6 flex justify-center items-center'>
        <IconDashboardSmall />
      </div>
      <div className='flex-grow flex-col'>
        <div className='text-lg font-medium text-slate-800'>대시보드</div>
      </div>
    </Link>
  );
};
export default NavDashBoard;
