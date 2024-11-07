import { useQuery } from '@tanstack/react-query';
import { Goal } from '../types/todo';
import baseFetch from '../api/baseFetch';

const useGoalQuery = (goalId: number, initialData?: Goal) => {
  return useQuery<Goal>({
    queryKey: ['goal', goalId],
    queryFn: () => baseFetch(`/4-4-dev/goals/${goalId.toString()}`),
    initialData: initialData,
  });
};
export default useGoalQuery;
