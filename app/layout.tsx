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
        url: 'https://private-user-images.githubusercontent.com/126558640/380996792-e395877f-61ec-4394-ae79-955fe705312f.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzAxODE3NzIsIm5iZiI6MTczMDE4MTQ3MiwicGF0aCI6Ii8xMjY1NTg2NDAvMzgwOTk2NzkyLWUzOTU4NzdmLTYxZWMtNDM5NC1hZTc5LTk1NWZlNzA1MzEyZi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQxMDI5JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTAyOVQwNTU3NTJaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0xM2FlYjI3NTQ4OGQ0ZTU1YjYxZDlhOWVlMDRkMWI5NjkwN2EyZjc4MWU4YzFlNmEwN2E4NWQ3ZDdjNTJkOTk4JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.EmRmkekrd5aiNgvoP3wGD7Gf8tbUxz9BjuXZWdjEQQ8',
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
