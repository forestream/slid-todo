import { useInfiniteQuery } from '@tanstack/react-query';
import { Goals } from '../types/todo';
import baseFetch from '../api/baseFetch';

const useInfiniteGoalsQuery = (size: number = 3) => {
  return useInfiniteQuery<Goals>({
    queryKey: ['goals', size],
    queryFn: ({ pageParam = null }) => {
      const params = new URLSearchParams({
        ...(pageParam !== null && { cursor: String(pageParam) }),
        size: String(size),
      });

      return baseFetch(`/4-4-dev/goals?${params.toString()}`);
    },
    initialPageParam: null, // 첫 요청에는 cursor가 null
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? null, // 다음 cursor 반환
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useInfiniteGoalsQuery;
