'use client';

import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver';
import { useNotesInfiniteQuery } from '@/lib/hooks/useNotesInfiniteQuery';
import { useEffect, useState } from 'react';
import NoteGoalTitle from './NoteGoalTitle';
import NotesList from './NotesList';
import baseFetch from '@/lib/api/baseFetch';
import { HttpError } from '@/lib/api/errorHandlers';

interface NotesContentProps {
  goalId: string;
}

const NotesContent: React.FC<NotesContentProps> = ({ goalId }) => {
  const [goalTitle, setGoalTitle] = useState('');
  const { data, fetchNextPage, hasNextPage, isFetching } = useNotesInfiniteQuery({
    goalId: Number(goalId),
  });
  useEffect(() => {
    const getGoalTitle = async () => {
      try {
        const goalData = await baseFetch(`/4-4-dev/goals/${goalId}`);
        setGoalTitle(goalData.title);
      } catch (error) {
        if (error instanceof HttpError) {
          console.error('Error fetching goal title:', error.message);
        }
      }
    };

    getGoalTitle();
  }, [goalId]);

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
      <NoteGoalTitle goalTitle={goalTitle} link={`/goals/${goalId}`} />
      <NotesList notes={validNotes} isFetching={isFetching} />
      <div ref={loadMoreRef} className='h-10 flex items-center justify-center'>
        {isFetching && <div>불러오는 중...</div>}
      </div>
    </>
  );
};

export default NotesContent;
