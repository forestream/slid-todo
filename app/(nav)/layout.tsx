// import NavBar from '@/components/nav/NavBar';
import NavBarTablet from '@/components/nav/NavBarTablet';
import NavBarTemp from '@/components/nav/NavBarTemp';

export default function NavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col h-screen sm:flex-row lg:flex-row'>
      <div className='block sm:hidden lg:block'>
        <NavBarTemp />
      </div>
      <div className='hidden sm:block lg:hidden'>
        <NavBarTablet />
      </div>
      <div className='flex-1'>{children}</div>
    </div>
  );
}
