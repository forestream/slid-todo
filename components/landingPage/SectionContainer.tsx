import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SectionContainerProps {
  children: React.ReactNode;
  index: number;
  classNameSection?: string;
  classNameDiv?: string;
}

const SectionContainer: React.FC<SectionContainerProps> = ({ children, classNameSection, classNameDiv, index }) => {
  return (
    <section
      className={twMerge(clsx('absolute h-screen w-full flex flex-col', classNameSection))}
      style={{ top: `${index * 100}vh` }}
      aria-label={`섹션 ${index + 1}`}
    >
      <div
        className={twMerge(
          clsx(
            'max-w-[400px] sm:max-w-[600px] lg:max-w-[800px] lg:mx-auto mx-auto sm:flex-row flex-col flex h-full gap-4',
            classNameDiv
          )
        )}
      >
        {children}
      </div>
    </section>
  );
};

export default SectionContainer;
