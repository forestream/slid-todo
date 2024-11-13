import Image from 'next/image';

const Loading = () => {
  return (
    <div
      className='flex items-center justify-center w-full h-full mt-10'
      role='status'
      aria-live='polite'
      aria-label='콘텐츠를 불러오는 중입니다'
    >
      <div className='flex flex-col items-center'>
        <div className='relative w-24 h-24 mb-8'>
          <Image
            src='/images/ImageOG.png'
            alt='Loading logo'
            width={245}
            height={50}
            className='object-contain animate-pulse'
            priority
          />
        </div>

        <div className='flex gap-1'>
          <p className='text-xl font-bold text-gray-700'>SLID TO DO</p>
        </div>

        <div className='mt-8 w-48 h-1 bg-gray-200 rounded-full overflow-hidden' aria-hidden='true'>
          <div className='h-full bg-blue-500 animate-loading-bar' />
        </div>
        <p className='sr-only'>콘텐츠를 불러오는 중입니다...</p>
      </div>
    </div>
  );
};

export default Loading;
