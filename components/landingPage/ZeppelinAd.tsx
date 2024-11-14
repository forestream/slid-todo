import Link from 'next/link';
import React from 'react';

const ZeppelinAd = () => {
  return (
    <div className='absolute h-[200px] top-1/3'>
      {/* Moving Container */}
      <div className='animate-moving-banner inline-flex items-center'>
        {/* Ad Banner */}
        <Link href='/signup'>
          <div className='bg-blue-600 text-white p-4 rounded-lg shadow-lg relative mr-4 animate-floatY'>
            <p className='font-bold text-lg whitespace-nowrap'>무료로 시작하기</p>
            {/* Triangle pointer */}
            <div
              className='absolute -right-4 top-1/2 transform -translate-y-1/2 
                        border-l-[16px] border-l-blue-600 
                        border-y-[12px] border-y-transparent'
            ></div>
          </div>
        </Link>

        {/* Zeppelin SVG */}
        <svg
          height='200px'
          width='200px'
          viewBox='0 0 512 512'
          xmlns='http://www.w3.org/2000/svg'
          className='animate-floatY transform transition-transform duration-300'
        >
          <path
            fill='#BA2B11'
            d='M407.596,272.204l-134.786,9.068c0,0-12.388,12.197-9.329,20.409l19.244,51.649 c2.315,6.21,8.243,10.328,14.869,10.328h81.312c6.591,0,12.496-4.075,14.835-10.237l23.059-60.751 C419.91,284.477,407.596,272.204,407.596,272.204z'
          />
          <path
            fill='#E64122'
            d='M340.15,276.742l-67.34,4.531c0,0-12.388,12.197-9.329,20.409l19.244,51.649 c2.315,6.21,8.243,10.328,14.869,10.328h42.555L340.15,276.742z'
          />
          <g>
            <path
              fill='#2E373A'
              d='M54.762,223.21c8.763,0,15.868-7.105,15.868-15.868v-6.731l16.827-7.139l3.967,4.24 c5.987,6.401,16.03,6.734,22.429,0.748c6.4-5.986,6.734-16.028,0.748-22.428l-14.646-15.656 c-7.154-7.647-17.264-12.034-27.737-12.034H54.763c-8.763,0-15.868,7.105-15.868,15.868v43.132 C38.894,216.105,45.999,223.21,54.762,223.21z'
            />
            <path
              fill='#2E373A'
              d='M91.424,283.457l-3.967,4.241l-16.827-7.138v-6.731c0-8.763-7.105-15.868-15.868-15.868 s-15.868,7.105-15.868,15.868v43.132c0,8.763,7.105,15.868,15.868,15.868h17.455c10.472,0,20.582-4.386,27.737-12.034 l14.646-15.657c5.987-6.4,5.652-16.441-0.748-22.427C107.452,276.72,97.41,277.057,91.424,283.457z'
            />
          </g>
          <path
            fill='#F9AA1A'
            d='M508.606,230.777c-17.335-22.046-39.831-40.176-65.057-52.43 c-25.226-12.254-53.382-18.731-81.427-18.731h-204.97c-59.074,0-114.966,25.756-153.347,70.66c-5.073,5.937-5.073,14.683,0,20.62 c38.381,44.905,94.274,70.66,153.347,70.66h204.97c28.045,0,56.202-6.477,81.427-18.732c25.226-12.254,47.722-30.385,65.057-52.429 C513.131,244.638,513.132,236.532,508.606,230.777z'
          />
          <path
            fill='#FFBE24'
            d='M249.784,159.615h-92.632c-59.074,0-114.966,25.756-153.347,70.66c-5.073,5.937-5.073,14.683,0,20.62 c38.381,44.905,94.274,70.66,153.347,70.66h92.632V159.615z'
          />
          <path
            fill='#212A2D'
            d='M126.74,256.453H98.362c-8.763,0-15.868-7.105-15.868-15.868c0-8.763,7.105-15.868,15.868-15.868 h28.378c8.763,0,15.868,7.105,15.868,15.868C142.608,249.348,135.503,256.453,126.74,256.453z'
          />
          <path
            fill='#2E373A'
            d='M112.551,256.453H98.362c-8.763,0-15.868-7.105-15.868-15.868c0-8.763,7.105-15.868,15.868-15.868 h14.189V256.453z'
          />
        </svg>
      </div>
    </div>
  );
};

export default ZeppelinAd;
