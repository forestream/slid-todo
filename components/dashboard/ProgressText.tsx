const ProgressText = ({ percentage }: { percentage: number }) => {
  return (
    <div className='flex-col mt-4'>
      <p className='text-white text-lg font-semibold'>내 진행 상황</p>
      <span className='flex mt-1 items-center gap-1 text-nowrap'>
        <p className='text-white text-3xl font-bold'>{percentage || 0}</p>
        <p className='text-white text-base font-semibold'>%</p>
      </span>
    </div>
  );
};

export default ProgressText;
