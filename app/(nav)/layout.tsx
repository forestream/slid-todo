import NavBar from '@/components/nav/NavBar';

export default function NavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex w-auto h-screen'>
      <NavBar />
      <div className='flex-1'>{children}</div>
    </div>
  );
}
