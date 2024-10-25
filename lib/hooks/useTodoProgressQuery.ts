import { useQuery } from '@tanstack/react-query';
import baseFetch from '../api/baseFetch';

const useTodoProgressQuery = (goalId: number) => {
  return useQuery({
    queryKey: ['GoalProgress', goalId],
    queryFn: () => baseFetch(`/4-4-dev/todos/progress?goalId=${goalId}`),
  });
};

export default useTodoProgressQuery;