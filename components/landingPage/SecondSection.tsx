import { motion } from 'framer-motion';
import { fadeInUp, staggerChildren } from '@/lib/animations/variants';
import { SectionProps } from '@/app/page';
import IconFile from '@/public/icons/IconFile';
import IconAddLink from '@/public/icons/IconAddLink';
import IconNoteView from '@/public/icons/IconNoteView';
import IconNoteWrite from '@/public/icons/IconNoteWrite';

const SecondSection = ({ isVisible }: SectionProps) => {
  return (
    <>
      <motion.div
        initial='initial'
        animate={isVisible ? 'animate' : 'initial'}
        variants={staggerChildren}
        className='w-full h-full flex flex-col justify-center'
        aria-label='할 일 기능 소개'
      >
        <motion.h2 variants={fadeInUp} className='text-4xl font-bold'>
          할 일 기능
        </motion.h2>
        <motion.p variants={fadeInUp} className='mt-4 lg:text-xl'>
          각 할 일에는 관련 링크와 파일을 저장할 수 있으며, 필요한 노트를 추가해 더 자세한 내용을 기록할 수 있습니다.
          업무에 필요한 모든 자료를 한 곳에 정리해보세요.
        </motion.p>
      </motion.div>
      <motion.div
        initial='initial'
        animate={isVisible ? 'animate' : 'initial'}
        variants={staggerChildren}
        className='w-full md:max-w-[800px] h-full flex flex-wrap sm:flex-nowrap justify-center items-center sm:gap-2 sm:px-2 gap-y-0'
      >
        <motion.div variants={fadeInUp} className='w-1/2  p-2 flex justify-center'>
          <IconFile className='w-full h-auto max-w-[160px]' />
        </motion.div>
        <motion.div variants={fadeInUp} className='w-1/2  p-2 flex justify-center'>
          <IconAddLink className='w-full h-auto max-w-[160px]' />
        </motion.div>
        <motion.div variants={fadeInUp} className='w-1/2  p-2 flex justify-center'>
          <IconNoteView className='w-full h-auto max-w-[160px]' />
        </motion.div>
        <motion.div variants={fadeInUp} className='w-1/2  p-2 flex justify-center'>
          <IconNoteWrite className='w-full h-auto max-w-[160px]' />
        </motion.div>
      </motion.div>
    </>
  );
};

export default SecondSection;
