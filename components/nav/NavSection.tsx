import { twMerge } from 'tailwind-merge';

type NavSectionProps = {
  children: React.ReactNode;
  className?: string;
};

const NavSection = ({ children, className }: NavSectionProps) => (
  <div className={twMerge('w-full justify-center items-center gap-4', className)}>{children}</div>
);

export default NavSection;
