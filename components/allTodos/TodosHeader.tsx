'use client';

import { IconPlusSmall } from '@/public/icons/IconPlusSmall';
import Button from '../common/ButtonSlid';
import PageHeader from '../common/pageLayout/PageHeader';
import { useState } from 'react';
import TodoAddModal from '../modal/todoModal/TodoAddModal';
import { useTodoContext } from './TodosContext';

const TodosHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { totalCount } = useTodoContext();
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <PageHeader title={`모든 할 일 (${totalCount})`}>
        <Button onClick={handleOpenModal} className='border-none gap-1 p-0 active:bg-none' variant='outlined'>
          <IconPlusSmall stroke='#3B82F6' />
          할일 추가
        </Button>
      </PageHeader>
      <TodoAddModal isOpen={isModalOpen} onChangeIsOpen={setIsModalOpen} />
    </>
  );
};

export default TodosHeader;
