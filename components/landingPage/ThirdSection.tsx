import { motion } from 'framer-motion';
import { fadeInRight, fadeInUp, staggerChildren } from '@/lib/animations/variants';
import { SectionProps } from '@/app/page';
import Image from 'next/image';

const ThirdSection = ({ isVisible }: SectionProps) => {
  return (
    <>
      <motion.div
        initial='initial'
        animate={isVisible ? 'animate' : 'initial'}
        variants={staggerChildren}
        className='w-full h-full flex flex-col justify-center'
      >
        <motion.h2 variants={fadeInUp} className='text-4xl font-bold'>
          목표 달성 현황
        </motion.h2>
        <motion.p variants={fadeInUp} className='mt-4 lg:text-xl'>
          설정한 목표의 달성률을 직관적으로 확인할 수 있습니다. 할 일이 완료될 때마다 목표의 이미지로 달성률이
          시각화됩니다.
        </motion.p>
      </motion.div>
      <motion.div
        initial={'initial'}
        animate={isVisible ? 'animate' : 'initial'}
        variants={fadeInRight}
        className='w-full md:max-w-[800px] h-full flex justify-center items-center relative px-4 md:px-0'
      >
        <Image
          src='/images/ImageGoalDoughnut.png'
          alt='달성률 도넛 차트 이미지'
          width={800}
          height={800}
          className='w-full h-auto rounded-lg shadow-lg object-cover'
          priority
        />
      </motion.div>
    </>
  );
};

export default ThirdSection;
