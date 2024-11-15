import { IconPlusSmall } from '@/public/icons/IconPlusSmall';
import ButtonSlid from '../common/ButtonSlid';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

interface addGoalButton {
  className: string;
  isNewGoalInputVisible: boolean;
  currentInputValue: string;
  onClick?: () => void;
}

const AddGoalButton = ({ className, isNewGoalInputVisible, currentInputValue, onClick }: addGoalButton) => {
  const buttonClass = twMerge(clsx('text-nowrap', className));
  const isInputEmpty = currentInputValue === '';
  return (
    <ButtonSlid className={buttonClass} variant={isInputEmpty ? 'outlined' : 'filled'} onClick={onClick}>
      {/* 내용이 있을때 */}
      {isNewGoalInputVisible && !isInputEmpty && <IconPlusSmall stroke='#fff' />}
      {/* 버튼이 안눌렸을때 */}
      {!isNewGoalInputVisible && <IconPlusSmall stroke='#3B82F6' />}
      <span>{isNewGoalInputVisible && isInputEmpty ? '취소' : '새 목표'}</span>
    </ButtonSlid>
  );
};
export default AddGoalButton;
