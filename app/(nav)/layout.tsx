import Nav from '@/components/nav/Nav';

export default function NavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col min-h-screen sm:flex-row lg:flex-row'>
      <Nav />
      <div className='flex-1 min-h-screen'>{children}</div>
    </div>
  );
}
