import { motion } from 'framer-motion';
import { fadeInLeft, fadeInUp, staggerChildren } from '@/lib/animations/variants';
import { SectionProps } from '@/app/page';

const SecondSection = ({ isVisible }: SectionProps) => {
  return (
    <>
      <motion.div
        initial='initial'
        animate={isVisible ? 'animate' : 'initial'}
        variants={fadeInLeft}
        className='w-[500px] h-full flex justify-center items-center'
      >
        이미지 위치
      </motion.div>
      <motion.div
        initial='initial'
        animate={isVisible ? 'animate' : 'initial'}
        variants={staggerChildren}
        className='w-full h-full flex flex-col justify-center'
      >
        <motion.h2 variants={fadeInUp} className='text-4xl font-bold'>
          할 일 기능
        </motion.h2>
        <motion.p variants={fadeInUp} className='mt-4 lg:text-xl'>
          각 할 일에는 관련 링크와 파일을 저장할 수 있으며, 필요한 노트를 추가해 더 자세한 내용을 기록할 수 있습니다.
          업무에 필요한 모든 자료를 한 곳에 정리해보세요.
        </motion.p>
      </motion.div>
    </>
  );
};

export default SecondSection;
