'use client';
import IconFlag from '@/public/icons/IconFlag';
import DropdownMenu from '../common/DropdownMenu';
import ProgressBar from '../common/ProgressBar';
import useGoalQuery from '@/lib/hooks/useGoalQuery';
import useTodoProgressQuery from '@/lib/hooks/useTodoProgressQuery';
import { IconKebab } from '@/public/icons/IconKebab';
import ConfirmationModal from '../modal/ConfirmationModal';
import { useDeleteGoalMutation } from '@/lib/hooks/useDeleteGoalMutation';
import { useUpdateGoalMutation } from '@/lib/hooks/useUpdateGoalMutation';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputSlid from '../common/InputSlid';
import { Goal } from '@/lib/types/todo';

const GoalTitleWithProgress = ({ goalId, initialGoal }: { goalId: number; initialGoal: Goal }) => {
  const { data: goal } = useGoalQuery(goalId, initialGoal);
  const progress = useTodoProgressQuery(goalId).data?.progress || 0;
  const deleteGoal = useDeleteGoalMutation();
  const updateGoal = useUpdateGoalMutation();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [goalInputValue, setGoalInputValue] = useState('');

  const router = useRouter();

  const handleDropdownMenuClick = (item: string) => {
    if (item === '수정하기') {
      setIsEditClicked(true);
    } else if (item === '삭제하기') {
      setIsDeleteModalOpen(true);
    }
  };

  const handleGoalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoalInputValue(e.target.value);
  };

  // 수정
  const handleGoalEditSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    updateGoal.mutate(
      { id: goalId, updates: { title: goalInputValue.trim() } },
      {
        onSuccess: (data) => {
          setGoalInputValue(data.title);
          setIsEditClicked(false);
        },
      }
    );
  };

  // 삭제
  const handleGoalDelete = () => {
    deleteGoal.mutate({ goalId: goalId });
    router.push('/dashboard');
  };

  return (
    <>
      <div className='w-full bg-white rounded-xl px-6 py-4'>
        <div className='w-full flex items-center gap-2'>
          <div
            className='w-10 h-10 flex-shrink-0 bg-slate-900 rounded-[15px] grid place-content-center'
            aria-hidden='true'
          >
            <IconFlag />
          </div>
          {isEditClicked ? (
            <form onSubmit={handleGoalEditSubmit} className='w-full h-auto m-0'>
              <InputSlid
                placeholder={goal?.title}
                className='m-0 w-full'
                inputClassName='w-full'
                autoFocus
                value={goalInputValue}
                onChange={handleGoalInputChange}
              />
            </form>
          ) : (
            <h2 className='text-lg font-semibold'>{goalInputValue || goal?.title}</h2>
          )}
          <div className='ml-auto'>
            <DropdownMenu
              icon={IconKebab}
              dropdownList={['수정하기', '삭제하기']}
              onItemClick={handleDropdownMenuClick}
              labelledById='goal-menu-options'
              tooltipText='더보기'
            />
          </div>
        </div>
        <div className='w-full flex-col mt-6'>
          <span className='text-xs font-semibold'>Progress</span>
          <ProgressBar percentage={progress} />
        </div>
      </div>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onChangeIsOpen={setIsDeleteModalOpen}
        itemType='goal'
        onConfirm={handleGoalDelete}
      />
    </>
  );
};

export default GoalTitleWithProgress;
