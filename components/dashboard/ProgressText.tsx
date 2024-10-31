import useTodoProgressQuery from '@/lib/hooks/useTodoProgressQuery';

const ProgressText = () => {
  const { data } = useTodoProgressQuery();
  const percentage = data?.progress || 0;
  return (
    <div className='flex-col mt-4'>
      <p className='text-white text-lg font-semibold text-nowrap'>내 진행 상황</p>
      <span className='flex mt-1 items-center gap-1 text-nowrap'>
        <p className='text-white text-3xl font-bold'>{percentage}</p>
        <p className='text-white text-base font-semibold'>%</p>
      </span>
    </div>
  );
};

export default ProgressText;
