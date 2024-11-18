'use client';
import { ImageProgress } from '@/public/images/ImageProgress';
import { ImageProgressMobile } from '@/public/images/ImageProgressMobile';
import { ImageProgressTablet } from '@/public/images/ImageProgressTablet';
import { IconProgress } from '@/public/icons/IconProgress';
import { CircleProgressBar } from './CircleProgressBar';
import useTodoProgressQuery from '@/lib/hooks/useTodoProgressQuery';

const Progress = () => {
  const { data } = useTodoProgressQuery();
  return (
    <section className='relative flex flex-1 min-w-72 min-h-[250px] bg-blue-500 rounded-xl'>
      <div className='flex-col pl-6 pt-4'>
        <div className='w-10 h-10 bg-slate-900 rounded-[15px] grid place-content-center' aria-hidden='true'>
          <IconProgress />
        </div>
        <div className='flex-col mt-4'>
          <h2 id='progress-heading' className='text-white text-lg font-semibold'>
            내 진행 상황
          </h2>
          <span id='progress-description' className='flex mt-1 items-center gap-1 text-nowrap'>
            <p className='text-white text-3xl font-bold'>{data?.progress || 0}</p>
            <p className='text-white text-base font-semibold'>%</p>
          </span>
        </div>
      </div>
      <div className='flex flex-grow relative' aria-hidden='true'>
        <div className='absolute right-0 bottom-0 '>
          <ImageProgressMobile className='block sm:hidden lg:hidden' />
          <ImageProgressTablet className='hidden sm:block lg:hidden ' />
          <ImageProgress className='hidden sm:hidden lg:block ' />
        </div>
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square'>
          <CircleProgressBar percentage={data?.progress || 0} radius={66} strokeWidth={32} />
        </div>
      </div>
    </section>
  );
};
export default Progress;
