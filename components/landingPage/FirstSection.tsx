import { motion } from 'framer-motion';

import Button from '@/components/common/ButtonSlid';
import Link from 'next/link';
import { fadeInRight, fadeInUp, staggerChildren } from '@/lib/animations/variants';
import { SectionProps } from '@/app/page';

const FirstSection = ({ isVisible }: SectionProps) => {
  return (
    <>
      <motion.div
        initial='initial'
        animate={isVisible ? 'animate' : 'initial'}
        variants={staggerChildren}
        className='w-full h-full flex flex-col justify-center'
      >
        <motion.h1 variants={fadeInUp} className='lg:text-6xl text-4xl font-bold mb-10'>
          당신의 동료 SlidToDo
        </motion.h1>
        <motion.h2 variants={fadeInUp} className='lg:text-4xl text-2xl font-bold mb-10'>
          효율적인 목표 관리와 체계적인 할 일 관리
        </motion.h2>
        <motion.p variants={fadeInUp} className='lg:text-2xl mb-10'>
          SlidToDo는 목표 설정과 할 일 관리에 필요한 모든 기능을 제공합니다. 목표부터 세부적인 할 일과 노트까지
          체계적으로 관리하여 효율적인 작업 흐름을 만들어 보세요.
        </motion.p>
        <motion.div variants={fadeInUp} className='flex space-x-4'>
          <Link href={'/login'}>
            <Button className='lg:w-48 lg:h-14'>시작하기</Button>
          </Link>
          <Link href={'/signup'}>
            <Button className='lg:w-48 lg:h-14' variant='outlined'>
              회원가입
            </Button>
          </Link>
        </motion.div>
      </motion.div>
      <motion.div
        initial='initial'
        animate={isVisible ? 'animate' : 'initial'}
        variants={fadeInRight}
        className='w-[500px] h-full flex justify-center items-center'
      >
        이미지 위치
      </motion.div>
    </>
  );
};

export default FirstSection;
