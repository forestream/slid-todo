import { motion } from 'framer-motion';
import { fadeInLeft, fadeInUp, staggerChildren } from '@/lib/animations/variants';
import { SectionProps } from '@/app/page';
import Image from 'next/image';

const FourthSection = ({ isVisible }: SectionProps) => {
  return (
    <>
      {' '}
      <motion.div
        initial='initial'
        animate={isVisible ? 'animate' : 'initial'}
        variants={fadeInLeft}
        className='w-full md:w-[800px] h-full flex justify-center items-center relative px-4 md:px-0'
        aria-label='할 일 임베드 기능 소개'
      >
        <Image
          src='/images/ImageEmbed.png'
          alt='할 일 임베드 기능 소개 이미지'
          width={800}
          height={800}
          className='w-full h-auto rounded-lg shadow-lg object-cover'
          priority
        />
      </motion.div>
      <motion.div
        initial='initial'
        animate={isVisible ? 'animate' : 'initial'}
        variants={staggerChildren}
        className='w-full h-full flex flex-col justify-center'
      >
        <motion.h2 variants={fadeInUp} className='text-4xl font-bold'>
          노트 작성과 임베드 기능
        </motion.h2>
        <motion.p variants={fadeInUp} className='mt-4 lg:text-xl'>
          할 일마다 1:1로 연결된 노트에 더 자세한 내용을 기록할 수 있습니다. 유연한 임베드 기능으로 참고할 외부 자료나
          링크를 편하게 참조해 작업 효율성을 높여보세요.
        </motion.p>
      </motion.div>
    </>
  );
};

export default FourthSection;
