import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '대시보드',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}
