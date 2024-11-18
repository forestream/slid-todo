import { IconFold } from '@/public/icons/IconFold';
import { ImageLogo } from '@/public/images/ImageLogo';
import { ImageLogoWithText } from '@/public/images/ImageLogoWithText';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import Link from 'next/link';
import NavSection from './NavSection';

type NavHeaderProps = {
  isLeftNavOpen?: boolean;
  isSheetOpen?: boolean;
  handleNavToggleButtonClick?: () => void;
  currentPageLabel?: string;
  children?: React.ReactNode;
};

type NavButtonProps = {
  onClick: () => void;
  icon: React.ReactNode;
  className?: string;
};

// hydration error를 방지하기위해 button이 아닌 div 태그 사용
const NavButton = ({ onClick, icon, className }: NavButtonProps) => (
  <div
    role='button'
    aria-label='사이드바 네비게이션 열기/닫기'
    tabIndex={0}
    className={twMerge(
      clsx(
        'sm:grid place-content-center hover:cursor-pointer w-6 h-6 p-1 bg-white hover:bg-slate-100 active:bg-slate-300 rounded-lg border-[1.5px] border-slate-400',
        className
      )
    )}
    onClick={onClick}
  >
    {icon}
  </div>
);

const NavHeader = ({ isLeftNavOpen, handleNavToggleButtonClick }: NavHeaderProps) => {
  return (
    <NavSection
      className={clsx('flex', isLeftNavOpen ? 'flex-row justify-between p-4' : 'sm:flex-col lg:flex-col p-4')}
    >
      <Link href='/dashboard'>{isLeftNavOpen ? <ImageLogoWithText /> : <ImageLogo />}</Link>
      {handleNavToggleButtonClick && (
        <NavButton onClick={handleNavToggleButtonClick} icon={<IconFold isFold={!isLeftNavOpen} />} />
      )}
    </NavSection>
  );
};

export default NavHeader;
