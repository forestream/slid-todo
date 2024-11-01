import { IconPlusSmall } from '@/public/icons/IconPlusSmall';
import ButtonSlid from '../common/ButtonSlid';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

interface addGoalButton {
  className: string;
  onClick?: () => void;
}

const AddGoalButton = ({ className, onClick }: addGoalButton) => {
  const buttonClass = twMerge(clsx('text-nowrap', className));
  return (
    <ButtonSlid className={buttonClass} variant='outlined' onClick={onClick}>
      <IconPlusSmall stroke='#3B82F6' />
      <span>새 목표</span>
    </ButtonSlid>
  );
};
export default AddGoalButton;
