import IconFlag from '@/public/icons/IconFlag';

const NoteGoalTitle = ({ goalTitle }: { goalTitle: string }) => {
  return (
    <div className='flex mb-4 items-center gap-x-2 rounded-xl bg-white border border-slate-100 py-3.5 px-6'>
      <div className='shrink-0 flex justify-center items-center rounded-md bg-slate-800 w-6 h-6'>
        <IconFlag />
      </div>
      <h2 className='line-clamp-1 text-sm font-semibold'>{goalTitle}</h2>
    </div>
  );
};

export default NoteGoalTitle;
