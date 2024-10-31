import { IconDashboardSmall } from '@/public/icons/IconDashboardSmall';
import ButtonSlid from '../common/ButtonSlid';
import { IconPlusSmall } from '@/public/icons/IconPlusSmall';
import Link from 'next/link';

const NavDashBoard = () => {
  return (
    <div className='w-full flex justify-between px-4 py-6 gap-2 text-nowrap'>
      <Link href='/dashboard' className='flex gap-2'>
        <div className='w-6 h-6 flex justify-center items-center'>
          <IconDashboardSmall />
        </div>
        <div className='flex-grow flex-col'>
          <div className='text-lg font-medium text-slate-800'>대시보드</div>
        </div>
      </Link>
      <div className='flex items-center sm:hidden lg:hidden'>
        <ButtonSlid className='gap-[2px] rounded-xl text-sm w-[84px] px-3 py-2'>
          <IconPlusSmall />
          <span>새 할 일</span>
        </ButtonSlid>
      </div>
    </div>
  );
};
export default NavDashBoard;
