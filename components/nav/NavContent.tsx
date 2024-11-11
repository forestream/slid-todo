import { motion } from 'framer-motion';
import NavGoal from './NavGoal';
import NavAllTodos from './NavAllTodos';
import NavDashBoard from './NavDashBoard';
import AddTodoButton from './AddTodoButton';
import Profile from './NavProfile';

const NavContent = ({ handleTodoModalOpen }: { handleTodoModalOpen: () => void }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {/* 유저 프로필 */}
      <Profile className='sm:border-none lg:border-none' />
      <div className='flex flex-col divide-y divide-slate-200'>
        {/* 대시보드 바로가기 및 새 할일 버튼 */}
        <div className='flex flex-row sm:flex-col lg:flex-col divide-y divide-slate-200 sm:border-none lg:border-none'>
          {/* 새 할 일 버튼 */}
          <div className='flex sm:justify-center items-center border-none px-4 py-6 order-2 sm:order-1 lg:order-1 ml-auto sm:w-full lg:w-full'>
            <AddTodoButton
              className={
                'sm:mx-0 lg:mx-0 gap-[2px] rounded-xl text-sm px-3 py-2 sm:py-3 lg:py-3 sm:px-6 lg:px-6 mt-0 w-[84px] sm:w-full lg:w-full'
              }
              onClick={handleTodoModalOpen}
            />
          </div>
          {/* 대시보드 바로가기 버튼 */}
          <div className='px-4 py-6 order-1 sm:order-2 lg:order-2'>
            <NavDashBoard />
          </div>
        </div>
        <div className='w-full flex justify-between px-4 py-6 gap-2 text-nowrap'>
          <NavAllTodos />
        </div>
        <NavGoal />
      </div>
    </motion.div>
  );
};
export default NavContent;
