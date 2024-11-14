import { IconPlusSmall } from '@/public/icons/IconPlusSmall';
import ButtonSlid from '../common/ButtonSlid';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

interface addGoalButton {
  className: string;
  currentInputValue: string;
  onClick?: () => void;
}

const AddGoalButton = ({ className, currentInputValue, onClick }: addGoalButton) => {
  const buttonClass = twMerge(clsx('text-nowrap', className));
  return (
    <ButtonSlid className={buttonClass} variant={currentInputValue === '' ? 'outlined' : 'filled'} onClick={onClick}>
      <IconPlusSmall stroke={currentInputValue === '' ? '#3B82F6' : undefined} />
      <span>새 목표</span>
    </ButtonSlid>
  );
};
export default AddGoalButton;
