import { SheetClose, SheetContent, SheetProvider } from '../common/Sheet';
import NavContent from './NavContent';
import { ImageLogoWithText } from '@/public/images/ImageLogoWithText';

interface NavMobileSheetProps {
  isSheetOpen: boolean;
  setIsSheetOpen: (isOpen: boolean) => void;
  handleTodoModalOpen: () => void;
}

const NavMobileSheet: React.FC<NavMobileSheetProps> = ({ isSheetOpen, setIsSheetOpen, handleTodoModalOpen }) => {
  return (
    <SheetProvider isOpen={isSheetOpen} onChangeIsOpen={setIsSheetOpen}>
      <SheetContent position={'top'} className={'sm:w-[280px] p-0'}>
        <div className='flex items-center justify-between pt-3 px-4 pb-4'>
          <ImageLogoWithText />
          <SheetClose />
        </div>
        <NavContent handleTodoModalOpen={handleTodoModalOpen} />
      </SheetContent>
    </SheetProvider>
  );
};

export default NavMobileSheet;
