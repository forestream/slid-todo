import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Metadata } from 'next';
import './globals.css';
import QueryClientProviderWrapper from './_view/QueryClientProvider';
import Toaster from '@/components/common/toast/toaster';

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
        url: 'https://raw.githubusercontent.com/FESI-4-4/slid-todo/94e3e96a28ec1a799f1d5d36c2dd833c7213ddf4/public/images/ImageOG.png',
        width: 300,
        height: 180,
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
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
