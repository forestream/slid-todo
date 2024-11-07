'use client';

import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver';
import { useNotesInfiniteQuery } from '@/lib/hooks/useNotesInfiniteQuery';
import NoteGoalTitle from './NoteGoalTitle';
import NotesList from './NotesList';
import { Goal } from '@/lib/types/todo';

interface NotesContentProps {
  goalId: string;
  goalData: Goal;
}

const NotesContent: React.FC<NotesContentProps> = ({ goalId, goalData }) => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useNotesInfiniteQuery({
    goalId: Number(goalId),
  });

  const loadMoreRef = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage && !isFetching,
    threshold: 0.5,
    rootMargin: '100px',
  });

  const notes = data?.pages.flatMap((page) => page.notes) ?? [];
  const validNotes = notes.filter((note) => note !== undefined);

  return (
    <>
      <NoteGoalTitle goalTitle={goalData.title} link={`/goals/${goalId}`} />
      <NotesList notes={validNotes} isFetching={isFetching} />
      <div ref={loadMoreRef} className='h-10 flex items-center justify-center'>
        {isFetching && <div>불러오는 중...</div>}
      </div>
    </>
  );
};

export default NotesContent;
