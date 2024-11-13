import Image from 'next/image';
import Link from 'next/link';

interface FooterSectionProps {
  index: number;
}

const FooterSection: React.FC<FooterSectionProps> = ({ index }) => {
  return (
    <footer style={{ top: `${index * 100}vh` }} className='w-full absolute h-full bg-gray-100'>
      <div className=' mx-auto lg:max-w-[1024px] px-10 py-20 h-full'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 h-full'>
          <section className='space-y-6' aria-labelledby='project-information'>
            <div className='space-y-2'>
              <h3 id='project-information' className='text-lg font-bold'>
                프로젝트 정보
              </h3>
              <p className='text-gray-600'>코드잇 부트캠프 | 심화프로젝트</p>
              <p className='text-gray-600'>프로젝트 기간: 2024.10.16 - 2024.11.25</p>
            </div>
            <div className='space-y-2'>
              <h3 className='text-lg font-bold'>팀원</h3>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='font-medium'>Frontend</p>
                  <ul className='text-gray-600' aria-label='프론트엔드 팀원 목록'>
                    <li>노민하</li>
                    <li>조한빈</li>
                    <li>조현진</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <section className='flex flex-col justify-between space-y-6' aria-label='slid to do 정보'>
            <div className='space-y-4'>
              <p className='text-2xl font-bold'>오늘도 Slid To do</p>
              <Image src='/images/ImageOG.png' alt='슬리드 로고' width={245} height={50} className='mb-4' />
              <div className='space-y-2'>
                <p className='text-gray-600'>효율적인 일정 관리를 위한 최적의 솔루션</p>
                <p className='text-gray-600'>코드잇 부트캠프에서 탄생한 프로젝트입니다.</p>
              </div>
            </div>
            <div className='space-y-4'>
              <nav aria-labelledby='project-links'>
                <h3 id='project-links' className='text-lg font-bold mb-2'>
                  프로젝트 링크
                </h3>
                <div className='flex space-x-4'>
                  <Link
                    href='https://github.com/FESI-4-4/slid-todo'
                    target='_blank'
                    className='text-gray-600 hover:text-gray-900'
                  >
                    Github
                  </Link>
                  <Link
                    href='https://hello-mina.notion.site/Slid-Todo-112af6040175801da861ff5745a00ea0'
                    target='_blank'
                    className='text-gray-600 hover:text-gray-900'
                  >
                    Documents
                  </Link>
                </div>
              </nav>
              <p className='text-sm text-gray-500'>© 2024 Slid To do. All rights reserved.</p>
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
