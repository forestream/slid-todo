import { motion } from 'framer-motion';
import { fadeInRight, fadeInUp, staggerChildren } from '@/lib/animations/variants';
import { SectionProps } from '@/app/page';

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
        className='w-[500px] h-full flex justify-center items-center'
      >
        이미지 위치
      </motion.div>
    </>
  );
};

export default ThirdSection;
