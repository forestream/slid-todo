import TodoContentsDrawer from '@/components/drawer/TodoContentsDrawer';
import { MOBILE_BREAKPOINT } from '@/constants';
import { Todo } from '@/lib/types/todo';
import clsx from 'clsx';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface TodoTitleProps {
  data: Todo;
}

const TodoTitle: React.FC<TodoTitleProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleTitleClick = () => {
    if (window.innerWidth >= MOBILE_BREAKPOINT) {
      //모바일이 아닐 때
    } else {
      // 모바일 일 때
      setIsOpen(true);
    }
  };

  return (
    <>
      <div
        onClick={handleTitleClick}
        className={twMerge(clsx('truncate hover:text-link cursor-pointer', data.done && 'line-through'))}
      >
        {data.title}
      </div>
      <TodoContentsDrawer isopen={isOpen} onChangeIsOpen={setIsOpen} data={data} />
    </>
  );
};

export default TodoTitle;
