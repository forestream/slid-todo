'use client';

import Button from '@/components/common/ButtonSlid';
import MainLogo from '@/public/images/MainLogo';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex flex-col items-center justify-center p-4'>
      <MainLogo className={`mb-[60px]`} />
      <div className='bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center'>
        {/* <Image
          src='/'
          alt=' 404 이미지'
          className='mx-auto mb-6 rounded-full'
          width={200}
          height={200}
        /> */}
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>앗! 페이지를 찾을 수 없어요</h2>
        <p className='text-gray-600 mb-8'>찾으시는 페이지가 사라졌거나 잘못된 주소를 입력하셨어요.</p>
        <div className='flex flex-col sm:flex-row justify-center gap-4'>
          <Button onClick={() => window.history.back()} className='flex items-center justify-center'>
            뒤로 가기
          </Button>
          <Button className='flex items-center justify-center' variant='outlined'>
            <Link href='/'>홈으로 가기</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
