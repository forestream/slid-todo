'use client';
import { IconFlagSmall } from '@/public/icons/IconFlagSmall';
import useInfiniteGoalsQuery from '@/lib/hooks/useInfiniteGoalsQuery';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Goal } from '@/lib/types/todo';
import Link from 'next/link';
import { useAddGoalMutation } from '@/lib/hooks/useAddGoalMutation';
import InputSlid from '../common/InputSlid';
import AddGoalButton from './AddGoalButton';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import DropdownMenu from '../common/DropdownMenu';
import { IconKebabWithCircle } from '@/public/icons/IconKebabWithCircle';
import { useDeleteGoalMutation } from '@/lib/hooks/useDeleteGoalMutation';
import { useUpdateGoalMutation } from '@/lib/hooks/useUpdateGoalMutation';
import ConfirmationModal from '../modal/ConfirmationModal';

const DEFAULT_INPUT_VALUE = '· ';
const NavGoal = ({ className }: { className?: string }) => {
  const [isGoalInputVisible, setIsGoalInputVisible] = useState(false);
  const [goalInputValue, setGoalInputValue] = useState('');
  const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null);
  const [kebabClickedGoal, setKebabClickedGoal] = useState<Goal>();
  const deleteGoal = useDeleteGoalMutation();
  const updateGoal = useUpdateGoalMutation();

  const [isEditFocused, setIsEditFocused] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState(-1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const addGoal = useAddGoalMutation();

  const { ref, inView } = useInView({ threshold: 0.1 });
  const { data, fetchNextPage } = useInfiniteGoalsQuery(20);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const handleGoalClick = (goalId: number) => {
    setSelectedGoalId(goalId);
  };

  const handleAddGoalButtonClick = () => {
    // 펼쳐진 상태 && 내용이 입력된 상태에서 추가 한 번 더 누르면 제출되도록 하기
    if (isGoalInputVisible && goalInputValue !== DEFAULT_INPUT_VALUE) {
      handleGoalSubmit();
    }

    setIsGoalInputVisible(!isGoalInputVisible);
    setGoalInputValue(DEFAULT_INPUT_VALUE);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // 유저가 `·` 기호를 지우지 못하게 항상 앞에 추가
    if (!inputValue.startsWith(DEFAULT_INPUT_VALUE)) {
      setGoalInputValue(`${DEFAULT_INPUT_VALUE}${inputValue.replace(/^·\s*/, '')}`);
    } else {
      setGoalInputValue(inputValue);
    }
  };

  const handleGoalSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmedGoalValue = goalInputValue.replace(DEFAULT_INPUT_VALUE, '').trim();
    addGoal.mutate({ updates: { title: trimmedGoalValue } });
    setIsGoalInputVisible(false);
    setGoalInputValue('· ');
  };

  const handleDropdownMenuClick = (item: string) => {
    if (item === '수정하기') {
      setIsEditFocused(true);
    } else if (item === '삭제하기') {
      setIsDeleteModalOpen(true);
    }
  };

  const handleNavGoalKebabClick = (goal: Goal) => {
    setKebabClickedGoal(goal);
    setEditingGoalId(goal.id);
  };

  const handleGoalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoalInputValue(e.target.value);
  };

  // 수정
  const handleGoalEditSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    updateGoal.mutate(
      { id: kebabClickedGoal?.id ?? -1, updates: { title: goalInputValue.trim() } },
      {
        onSuccess: (data) => {
          setGoalInputValue(data.title);
          setIsEditFocused(false);
        },
      }
    );
  };

  // 삭제
  const handleGoalDelete = () => {
    deleteGoal.mutate({ goalId: kebabClickedGoal?.id ?? -1 });
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className={twMerge(clsx('flex flex-wrap px-4 py-6 gap-4', className))}>
        <div className='flex items-center gap-2 order-1 sm:order-1 lg:order-1'>
          <div className='w-6 h-6 flex justify-center items-center'>
            <IconFlagSmall />
          </div>
          <div className='text-lg font-medium text-slate-800'>목표</div>
        </div>

        {/* 새 목표 버튼 (모바일에서는 타이틀 옆, 태블릿과 데스크탑에서는 맨 아래로) */}
        <AddGoalButton
          className='order-2 sm:order-4 lg:order-4 ml-auto sm:mx-0 lg:mx-0 gap-[2px] rounded-xl text-sm px-3 py-2 sm:p-3 lg:p-3 sm:px-6 lg:px-6 mt-0 w-[84px] sm:w-full lg:w-full'
          onClick={handleAddGoalButtonClick}
        />

        <div className='order-3 sm:order-2 lg:order-2 w-full max-h-72 overflow-y-auto h-auto'>
          {data?.pages.map((page, idx) => (
            <div key={page.nextCursor || idx} className='flex-col'>
              {page.goals.map((goal: Goal) => (
                <div className='flex items-center group rounded-lg  hover:bg-slate-50 ' key={goal.id}>
                  {/* kebab에서 수정하기를 클릭하면 Input, 그 외에는 일반 Link로 goal list */}
                  {isEditFocused && editingGoalId === goal.id ? (
                    <form onSubmit={handleGoalEditSubmit} className='w-full h-auto m-0'>
                      <InputSlid
                        type='text'
                        placeholder={goal?.title}
                        className='my-0 mx-2'
                        inputClassName='flex-grow py-1 px-2 text-xs font-medium rounded-lg'
                        value={goalInputValue}
                        onChange={handleGoalInputChange}
                        autoFocus
                        onBlur={(e) => {
                          if (!e.currentTarget.contains(e.relatedTarget)) {
                            setIsEditFocused(false);
                          }
                        }}
                      />
                    </form>
                  ) : (
                    <>
                      <Link
                        href={`/goals/${goal.id}`}
                        key={goal.id}
                        className={clsx(
                          'flex flex-grow text-slate-700 text-sm font-medium group-hover:bg-slate-50 p-2 hover-trigger',
                          goal.id === selectedGoalId ? 'bg-slate-50' : 'bg-white'
                        )}
                        onClick={() => handleGoalClick(goal.id)}
                      >
                        {`${DEFAULT_INPUT_VALUE}${goal.title}`}
                      </Link>
                      <div
                        className='items-center justify-center ml-auto hidden group-hover:flex'
                        onClick={() => handleNavGoalKebabClick(goal)}
                      >
                        <DropdownMenu
                          icon={IconKebabWithCircle}
                          dropdownList={['수정하기', '삭제하기']}
                          onItemClick={handleDropdownMenuClick}
                          className='space-y-0'
                          dropdownListClassName='text-sm'
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
          <div ref={ref}></div>
        </div>

        {/* 새 목표 클릭시 생성되는 인풋 */}
        {isGoalInputVisible && (
          <div className='order-4 sm:order-3 lg:order-3 w-full flex items-center'>
            <form onSubmit={handleGoalSubmit} className='w-full h-auto m-0'>
              <InputSlid
                type='text'
                className='m-0'
                inputClassName='flex-grow p-2 m-0 text-sm font-medium bg-white rounded-lg border-2 border-blue-200'
                value={goalInputValue}
                onChange={handleInputChange}
                autoFocus
              />
            </form>
          </div>
        )}
      </div>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onChangeIsOpen={setIsDeleteModalOpen}
        itemType='goal'
        itemTitle={kebabClickedGoal?.title}
        onConfirm={handleGoalDelete}
      />
    </>
  );
};

export default NavGoal;
