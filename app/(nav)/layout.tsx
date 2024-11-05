import NavBar from '@/components/nav/NavBar';

export default function NavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col h-screen sm:flex-row lg:flex-row'>
      <NavBar />
      <div className='flex-1'>{children}</div>
    </div>
  );
}
