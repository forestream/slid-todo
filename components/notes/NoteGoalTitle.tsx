import IconFlag from '@/public/icons/IconFlag';
import Link from 'next/link';

interface NoteGoalTitleProps {
  goalTitle: string;
  link: string;
}

const NoteGoalTitle: React.FC<NoteGoalTitleProps> = ({ goalTitle, link }) => {
  return (
    <div className='flex mb-4 items-centerrounded-xl bg-white border border-slate-100 py-3.5 px-6 rounded-xl'>
      <Link
        className='flex gap-x-2 items-center flex-grow-0'
        href={link}
        aria-label={`목표 페이지로 이동 - ${goalTitle}`}
      >
        <div className='shrink-0 flex justify-center items-center rounded-md bg-slate-800 w-6 h-6'>
          <IconFlag />
        </div>
        <h2 className='line-clamp-1 text-sm font-semibold'>{goalTitle}</h2>
      </Link>
    </div>
  );
};

export default NoteGoalTitle;
