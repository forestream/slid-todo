import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Metadata } from 'next';
import './globals.css';
import QueryClientProviderWrapper from './_view/QueryClientProvider';

export const metadata: Metadata = {
  title: {
    template: '%s | SlidToDo',
    default: 'SlidToDo',
  },
  description: '할 일을 SlidToDo로 관리하세요',
  keywords: ['to do', 'slid', 'slide', '할 일', '슬라이드'],
  openGraph: {
    title: 'SlidToDo',
    description: '할 일을 지금 당장 SlidToDo에서 관리해보세요!',
    url: 'https://slid-todo-xi.vercel.app/login',
    siteName: 'SlidToDo',
    images: [
      {
        url: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/slid-todo/4-4-dev_124_1730179175960.png',
        width: 280,
        height: 140,
      },
    ],

    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>
        <QueryClientProviderWrapper>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
