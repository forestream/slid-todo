'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, useState } from 'react';

const QueryClientProviderWrapper = ({ children }: PropsWithChildren) => {
  console.log('쿼리클라이언트프로바이더래퍼');
  const [queryClient] = useState(
    () =>
      new QueryClient({
        // 옵션 추가 가능
        defaultOptions: {
          queries: {
            retry: 1,
            retryDelay: 0,
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryClientProviderWrapper;
