interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, children }) => {
  return (
    <header className='mb-4 flex items-center justify-between'>
      <h1 className='text-slate-900 sm:text-lg font-semibold'>{title}</h1>
      {children}
    </header>
  );
};

export default PageHeader;
