'use client';
import React, { useEffect, useState } from 'react';
import { GoalInTodo } from '@/lib/types/todos';
import DropdownMenu from '@/components/common/DropdownMenu';
import IconArrowDown from '@/public/icons/IconArrowDown';
import clsx from 'clsx';

interface GoalSelectorProps {
  goals: GoalInTodo[] | undefined;
  onSelect: (goalId: number | null) => void;
  selectedGoalId: number | null;
}

const GoalSelector = ({ goals, onSelect, selectedGoalId }: GoalSelectorProps) => {
  const [selectedGoal, setSelectedGoal] = useState<GoalInTodo | null>(null);

  useEffect(() => {
    if (selectedGoalId !== null) {
      const goal = goals?.find((g) => g.id === selectedGoalId);
      setSelectedGoal(goal || null);
    } else {
      setSelectedGoal(null);
    }
  }, [selectedGoalId, goals]);

  const handleItemClick = (goal: GoalInTodo) => {
    setSelectedGoal(goal);
    onSelect(goal.id);
  };

  const handleDropdownClick = (item: string) => {
    const goal = goals?.find((g) => g.title === item);
    if (goal) {
      handleItemClick(goal);
    } else {
      setSelectedGoal(null);
      onSelect(null);
    }
  };

  const isPlaceholder = !selectedGoal;
  const dropdownText = selectedGoal ? selectedGoal.title : '목표를 선택해주세요';
  const goalClass = clsx(
    'w-full px-6 py-3 rounded-xl',
    'focus:outline-none focus:ring-1 focus:ring-blue-500',
    'bg-gray-50',
    'text-sm sm:text-base',
    isPlaceholder ? 'text-slate-400' : 'text-slate-800'
  );

  return (
    <div className='w-full justify-center items-center text-center'>
      <DropdownMenu
        text={dropdownText}
        sideIcon={IconArrowDown}
        dropdownList={['목표를 선택해주세요', ...(goals ? goals.map((goal) => goal.title) : [])]}
        dropdownAlign='center'
        onItemClick={handleDropdownClick}
        className={goalClass}
        dropdownListClassName='bg-gray-50 hover:bg-gray-200'
      />
      <input type='hidden' value={selectedGoal ? selectedGoal.id : ''} />
    </div>
  );
};

export default GoalSelector;
