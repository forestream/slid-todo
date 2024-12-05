import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '노트 작성',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
