import { IconPlusSmall } from '@/public/icons/IconPlusSmall';
import ButtonSlid from '../common/ButtonSlid';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

interface addTodoButton {
  className: string;
  onClick?: () => void;
}

const AddTodoButton = ({ className, onClick }: addTodoButton) => {
  const buttonClass = twMerge(clsx('text-nowrap', className));
  return (
    <ButtonSlid className={buttonClass} onClick={onClick}>
      <IconPlusSmall />
      <span>새 할 일</span>
    </ButtonSlid>
  );
};
export default AddTodoButton;
