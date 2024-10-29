import { useQuery } from '@tanstack/react-query';
import { Goal } from '../types';
import baseFetch from '../api/baseFetch';

const useGoalQuery = (goalId: number) => {
  return useQuery<Goal>({
    queryKey: ['goal', goalId],
    queryFn: () => baseFetch(`/4-4-dev/goals/${goalId.toString()}`),
  });
};
export default useGoalQuery;
