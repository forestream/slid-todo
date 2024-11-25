'use client';

import Button from '@/components/common/ButtonSlid';
import MainLogo from '@/public/images/MainLogo';
import { useRouter } from 'next/navigation';

export default function Error() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <main
      className='min-h-screen bg-gradient-to-b from-red-100 to-orange-100 flex flex-col items-center justify-center p-4'
      role='main'
      aria-labelledby='error-heading'
    >
      <MainLogo className='mb-[60px]' aria-hidden='true' />
      <div className='bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center'>
        <h1 id='error-heading' className='text-2xl font-semibold text-gray-800 mb-4'>
          오류가 발생했어요!
        </h1>
        <p className='text-gray-600 mb-8 break-keep'>
          예기치 않은 문제가 발생했어요. <br />
          홈으로 돌아가거나 다시 시도해 주세요.
        </p>
        <div className='flex flex-col sm:flex-row justify-center gap-4'>
          <Button onClick={handleGoBack} className='flex items-center justify-center'>
            다시 시도
          </Button>
          <Button onClick={handleGoHome} className='flex items-center justify-center' variant='outlined'>
            홈으로 가기
          </Button>
        </div>
      </div>
    </main>
  );
}
