const ProgressBar = ({ percentage }: { percentage: number }) => {
  return (
    <div className='flex items-center gap-2 px-[9px] py-1 w-full bg-white rounded-full'>
      <div className='relative w-full bg-slate-100 rounded-full h-1'>
        <div className='absolute top-0 left-0 bg-slate-900 h-1 rounded-full' style={{ width: `${percentage}%` }}></div>
      </div>
      <div className='flex ml-auto text-xs font-semibold'>
        <span>{percentage}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
