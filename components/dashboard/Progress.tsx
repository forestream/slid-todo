import { ImageProgress } from '@/public/images/ImageProgress';
import { ImageProgressMobile } from '@/public/images/ImageProgressMobile';
import { ImageProgressTablet } from '@/public/images/ImageProgressTablet';
import { IconProgress } from '@/public/icons/IconProgress';
import ProgressText from './ProgressText';

const Progress = () => {
  return (
    <section
      className=' relative flex justify-between w-[343px] h-[250px] 
    sm:w-[306px] sm:h-[250px]
    lg:w-[588px] lg:h-[250px] bg-blue-500 rounded-xl'
    >
      <div className='flex-col px-6 pt-4'>
        <div className='w-10 h-10 bg-slate-900 rounded-[15px] grid place-content-center'>
          <IconProgress />
        </div>
        <ProgressText />
      </div>
      <div className='absolute right-0 bottom-0'>
        <ImageProgressMobile className='block sm:hidden lg:hidden' />
        <ImageProgressTablet className='hidden sm:block lg:hidden ' />
        <ImageProgress className='hidden sm:hidden lg:block ' />
      </div>
    </section>
  );
};
export default Progress;
