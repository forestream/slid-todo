import { IconFold } from '@/public/icons/IconFold';
import { IconHamburger } from '@/public/icons/IconHamburger';
import { ImageLogo } from '@/public/images/ImageLogo';
import { ImageLogoWithText } from '@/public/images/ImageLogoWithText';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import Link from 'next/link';

type widthType = 'mobile' | 'tablet' | 'desktop';

type NavHeaderProps = {
  isDesktopNavOpen: boolean;
  isSheetOpen: boolean;
  handleNavToggleButtonClick: (widthType?: widthType) => void;
  currentPageLabel?: string;
  children?: React.ReactNode;
};

type NavSectionProps = {
  children: React.ReactNode;
  className?: string;
};

type NavButtonProps = {
  onClick: () => void;
  icon: React.ReactNode;
  className?: string;
};

// hydration error를 방지하기위해 button이 아닌 div 태그 사용
const NavButton = ({ onClick, icon, className }: NavButtonProps) => (
  <div
    className={twMerge(
      clsx(
        'grid place-content-center hover:cursor-pointer w-6 h-6 p-1 bg-white hover:bg-slate-100 active:bg-slate-300 rounded-lg border-[1.5px] border-slate-400',
        className
      )
    )}
    onClick={onClick}
  >
    {icon}
  </div>
);

const NavSection = ({ children, className }: NavSectionProps) => (
  <div className={twMerge('w-full justify-center items-center gap-4', className)}>{children}</div>
);

const NavHeader = ({
  isDesktopNavOpen,
  isSheetOpen,
  handleNavToggleButtonClick,
  currentPageLabel,
  children,
}: NavHeaderProps) => {
  return (
    <>
      {/* 데스크탑 */}
      <NavSection
        className={clsx(
          'hidden sm:hidden lg:flex',
          isDesktopNavOpen ? 'flex-row justify-between p-4' : 'sm:flex-col lg:flex-col p-4'
        )}
      >
        <Link href='/dashboard'>{isDesktopNavOpen ? <ImageLogoWithText /> : <ImageLogo />}</Link>
        <NavButton
          onClick={() => handleNavToggleButtonClick('desktop')}
          icon={<IconFold isFold={!isDesktopNavOpen} />}
        />
      </NavSection>

      {/* 태블릿 */}
      <NavSection className={clsx('hidden sm:flex lg:hidden p-4', isSheetOpen ? 'flex-row justify-start' : 'flex-col')}>
        {isSheetOpen ? (
          <Link href='/dashboard'>
            <ImageLogoWithText />
          </Link>
        ) : (
          <>
            <Link href='/dashboard'>
              <ImageLogo />
            </Link>
            <NavButton onClick={() => handleNavToggleButtonClick('tablet')} icon={<IconFold isFold={!isSheetOpen} />} />
          </>
        )}
      </NavSection>

      {/* 모바일 */}
      <NavSection className='flex sm:hidden lg:hidden flex-row px-[14px] py-4 justify-normal'>
        {isSheetOpen ? (
          <>
            <IconHamburger />
            <h1 className='text-base font-semibold text-slate-900'>{currentPageLabel}</h1>
            <div className='ml-auto flex justify-center items-center'>{children}</div>
          </>
        ) : (
          <>
            <IconHamburger onClick={() => handleNavToggleButtonClick('mobile')} className='hover:cursor-pointer' />

            <h1 className='text-base font-semibold text-slate-900'>{currentPageLabel}</h1>
          </>
        )}
      </NavSection>
    </>
  );
};

export default NavHeader;
