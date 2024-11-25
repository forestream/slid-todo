'use client';
import { IconFlagSmall } from '@/public/icons/IconFlagSmall';
import useInfiniteGoalsQuery from '@/lib/hooks/useInfiniteGoalsQuery';
import { useEffect, useRef, useState } from 'react';
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
import { usePathname, useRouter } from 'next/navigation';

const DEFAULT_INPUT_VALUE = '· ';

const NavGoal = ({ className }: { className?: string }) => {
  const [isNewGoalInputVisible, setIsNewGoalInputVisible] = useState(false);
  const [newGoalInputValue, setNewGoalInputValue] = useState(DEFAULT_INPUT_VALUE); // 새롭게 생성할 목표의 input값
  const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null);
  const [existingGoalInputValue, setExistingGoalInputValue] = useState(''); // 기존에 있던 목표의 input값
  const [kebabClickedGoal, setKebabClickedGoal] = useState<Goal>(); // 케밥 아이콘을 클릭한 목표 정보 저장
  const [isEditFocused, setIsEditFocused] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState(-1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const addGoal = useAddGoalMutation();
  const deleteGoal = useDeleteGoalMutation();
  const updateGoal = useUpdateGoalMutation();

  const { ref, inView } = useInView({ threshold: 0.1 });
  const { data, fetchNextPage } = useInfiniteGoalsQuery(20);

  const newGoalInputRef = useRef<HTMLDivElement | null>(null);
  const newGoalButtonRef = useRef<HTMLDivElement | null>(null);

  const path = usePathname();
  const route = useRouter();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        newGoalInputRef.current &&
        !newGoalInputRef.current.contains(event.target as Node) &&
        newGoalButtonRef.current &&
        !newGoalButtonRef.current.contains(event.target as Node)
      ) {
        setIsNewGoalInputVisible(false);
        setNewGoalInputValue(DEFAULT_INPUT_VALUE);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 목표 추가
  // 새 목표 input change handler
  const handleNewGoalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // 유저가 `·` 기호를 지우지 못하게 항상 앞에 추가
    if (!inputValue.startsWith(DEFAULT_INPUT_VALUE)) {
      setNewGoalInputValue(`${DEFAULT_INPUT_VALUE}${inputValue.replace(/^·\s*/, '')}`);
    } else {
      setNewGoalInputValue(inputValue);
    }
  };

  const handleAddGoalButtonClick = () => {
    // Input이 열려 있고, 내용이 입력된 상태라면 폼 제출
    if (isNewGoalInputVisible && newGoalInputValue !== DEFAULT_INPUT_VALUE) {
      handleGoalSubmit();
    }

    setIsNewGoalInputVisible(!isNewGoalInputVisible);
    setNewGoalInputValue(DEFAULT_INPUT_VALUE);
  };

  const handleGoalSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmedGoalValue = newGoalInputValue.replace(DEFAULT_INPUT_VALUE, '').trim();
    if (trimmedGoalValue.length > 0) addGoal.mutate({ updates: { title: trimmedGoalValue } });
    setIsNewGoalInputVisible(false);
    setNewGoalInputValue(DEFAULT_INPUT_VALUE);
  };

  // 목표 수정 및 삭제
  const handleDropdownMenuClick = (item: string) => {
    if (item === '수정하기') {
      setIsEditFocused(true);
    } else if (item === '삭제하기') {
      setIsDeleteModalOpen(true);
    }
  };

  const handleGoalClick = (goalId: number) => {
    setSelectedGoalId(goalId);
  };

  const handleNavGoalKebabClick = (goal: Goal) => {
    setKebabClickedGoal(goal);
    setEditingGoalId(goal.id);
  };

  const handleExistingGoalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExistingGoalInputValue(e.target.value);
  };

  // 수정
  const handleGoalEditSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    updateGoal.mutate(
      { id: kebabClickedGoal?.id ?? -1, updates: { title: existingGoalInputValue.trim() } },
      {
        onSuccess: (data) => {
          setExistingGoalInputValue(data.title);
          setIsEditFocused(false);
        },
      }
    );
  };

  // 삭제
  const handleGoalDelete = () => {
    deleteGoal.mutate({ goalId: kebabClickedGoal?.id ?? -1 });
    setIsDeleteModalOpen(false);
    // 현재 페이지가 해당 goal의 id인 페이지라면 대시보드로 페이지 이동
    if (path === `/goals/${kebabClickedGoal?.id}`) {
      route.push('/dashboard');
    }
  };

  return (
    <>
      <div className={twMerge(clsx('flex flex-wrap px-4 py-6 gap-4', className))}>
        <div className='flex flex-grow items-center gap-2 order-1 sm:order-1 lg:order-1'>
          <div className='w-6 h-6 flex justify-center items-center' aria-hidden='true'>
            <IconFlagSmall />
          </div>
          <span className='text-lg font-medium text-slate-800'>목표</span>
        </div>

        <div className='order-3 sm:order-2 lg:order-2 w-full max-h-60 sm:max-h-72 lg:max-h-72 overflow-auto scroll-container h-auto'>
          {data?.pages.map((page, idx) => (
            <ul key={page.nextCursor || idx} className='flex flex-col gap-1 p-1' aria-label='목표 전체 리스트'>
              {page.goals.map((goal: Goal) => (
                <li className='flex items-center group rounded-lg hover:bg-slate-50 break-keep' key={goal.id}>
                  {/* kebab에서 수정하기를 클릭하면 Input, 그 외에는 일반 Link로 goal list */}
                  {isEditFocused && editingGoalId === goal.id ? (
                    <form
                      onSubmit={handleGoalEditSubmit}
                      className='w-full h-auto m-0'
                      aria-label={`${goal.title} 수정 입력창`}
                    >
                      {/* 목표 수정 클릭시 생성되는 input */}
                      <InputSlid
                        type='text'
                        placeholder={goal?.title}
                        className='my-0 mx-2'
                        inputClassName='flex-grow py-1 px-2 text-xs font-medium rounded-lg'
                        value={existingGoalInputValue}
                        onChange={handleExistingGoalInputChange}
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
                          'flex flex-grow text-slate-700 text-sm font-medium group-hover:bg-slate-50 px-2 py-1.5 hover-trigger',
                          goal.id === selectedGoalId ? 'bg-slate-50' : 'bg-white'
                        )}
                        onClick={() => handleGoalClick(goal.id)}
                      >
                        {`${DEFAULT_INPUT_VALUE}${goal.title}`}
                      </Link>
                      <div
                        className='items-center justify-center ml-auto flex lg:hidden group-hover:flex'
                        onClick={() => handleNavGoalKebabClick(goal)}
                        role='button'
                        aria-label='목표 관리 메뉴 열기'
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
                </li>
              ))}
            </ul>
          ))}
          <div ref={ref}></div>
        </div>

        {/* 새 목표 클릭시 생성되는 인풋 */}
        {isNewGoalInputVisible && (
          <div ref={newGoalInputRef} className='order-4 sm:order-3 lg:order-3 w-full flex items-center'>
            <form onSubmit={handleGoalSubmit} className='w-full h-auto m-0'>
              <InputSlid
                type='text'
                className='m-0'
                inputClassName='flex-grow p-2 m-0 text-sm font-medium bg-white rounded-lg border-2 border-blue-200'
                value={newGoalInputValue}
                onChange={handleNewGoalInputChange}
                autoFocus
              />
            </form>
          </div>
        )}

        {/* 새 목표 버튼 (모바일에서는 타이틀 옆, 태블릿과 데스크탑에서는 맨 아래로) */}
        <div
          ref={newGoalButtonRef}
          tabIndex={0}
          className='order-2 sm:order-4 lg:order-4 ml-auto sm:mx-0 lg:mx-0 gap-[2px] rounded-xl text-sm sm:w-full lg:w-full'
        >
          <AddGoalButton
            className='w-[84px] sm:w-full lg:w-full px-3 py-2 sm:px-6 sm:py-4 lg:px-6 lg:py-4'
            isNewGoalInputVisible={isNewGoalInputVisible}
            currentInputValue={newGoalInputValue.replace(DEFAULT_INPUT_VALUE, '').trim()}
            onClick={handleAddGoalButtonClick}
          />
        </div>
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
