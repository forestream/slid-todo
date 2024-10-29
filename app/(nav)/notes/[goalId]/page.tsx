'use client';

import PageContainer from '@/components/common/PageLayout/PageContainer';
import PageHeader from '@/components/common/PageLayout/PageHeader';
import NoteGoalTitle from '@/components/notes/NoteGoalTitle';
import NotesList from '@/components/notes/NotesList';
import baseFetch from '@/lib/api/baseFetch';
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver';
import { useNotesInfiniteQuery } from '@/lib/hooks/useNotesInfiniteQuery';
import { useEffect, useState } from 'react';

export interface Note {
  todo: {
    done: boolean;
    title: string;
    id: number;
  };
  updatedAt: string;
  createdAt: string;
  title: string;
  id: number;
  goal: {
    title: string;
    id: number;
  };
  userId: number;
  teamId: string;
}

export interface data {
  nextCursor: number;
  totalCount: number;
  notes: Note[];
}

export default function Notes({ params }: { params: { goalId: string } }) {
  const [goalTitle, setGoalTitle] = useState('');
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } = useNotesInfiniteQuery({
    goalId: Number(params.goalId),
  });
  useEffect(() => {
    const getGoalTitle = async () => {
      try {
        const goalData = await baseFetch(`/4-4-dev/goals/${params.goalId}`);
        setGoalTitle(goalData.title);
      } catch (error) {
        console.error('Error fetching goal title:', error);
      }
    };

    getGoalTitle();
  }, [params.goalId]);

  const loadMoreRef = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage && !isFetching,
    threshold: 0.5,
    rootMargin: '100px',
  });

  if (isLoading) {
    return <div>불러오는 중...</div>;
  }
  const notes = data?.pages.flatMap((page) => page.notes) ?? [];

  return (
    <PageContainer>
      <PageHeader title='노트 모아보기' />
      <NoteGoalTitle goalTitle={goalTitle} />
      <NotesList notes={notes} />
      <div ref={loadMoreRef} className='h-10 flex items-center justify-center'>
        {isFetching && <div>불러오는 중...</div>}
      </div>
    </PageContainer>
  );
}
