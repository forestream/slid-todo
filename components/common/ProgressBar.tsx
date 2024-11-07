'use client';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const ProgressBar = ({ percentage: initialPercentage, className }: { percentage: number; className?: string }) => {
  const progressBarClass = twMerge(clsx('flex items-center gap-2  py-1 w-full bg-white rounded-full', className));
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPercentage(initialPercentage);
    }, 300);
    return () => clearTimeout(timer);
  }, [initialPercentage]);

  return (
    <div className={progressBarClass}>
      <div className='relative w-full bg-slate-100 rounded-full h-1'>
        <div
          className='absolute top-0 left-0 bg-slate-900 h-1 rounded-full transition-all ease-in-out duration-1000'
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className='flex ml-auto text-xs font-semibold'>
        <span>{percentage}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
