import { ModalClose, ModalContent, ModalProvider, useModalContext } from '../../common/Modal';
import InputSlid from '../../common/InputSlid';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FileUpload from './ButtonUploadFile';
import useInfiniteGoalsQuery from '@/lib/hooks/useInfiniteGoalsQuery';
import Button from '@/components/common/ButtonSlid';
import { useAddTodoMutation } from '@/lib/hooks/useAddTodoMutation';
import { TodoAddFormData, todoAddSchema } from '@/lib/schemas/todosSchemas';
import cleanedFormData from '@/lib/utils/cleanedFormData';
import GoalSelector from './GoalSelector';
import { useEffect, useState } from 'react';
import isValidImageUrl from '@/lib/utils/isValidImageUrl';
import Image from 'next/image';

interface TodoAddModalProps {
  goalId?: number;
  isOpen: boolean;
  onChangeIsOpen: (isOpen: boolean) => void;
}

const Content = ({ goalId }: { goalId?: number }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { handleClose } = useModalContext();
  const addTodo = useAddTodoMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus,
    watch,
    reset,
    getValues,
  } = useForm<TodoAddFormData>({
    resolver: zodResolver(todoAddSchema),
    defaultValues: {
      title: '',
      fileUrl: '',
      linkUrl: '',
      goalId: goalId || null,
    },
  });
  useEffect(() => {
    setFocus('title');
  }, [setFocus]);
  const onSubmit = (data: TodoAddFormData) => {
    const cleanedData = cleanedFormData(data);
    addTodo.mutate({ updates: cleanedData });
    reset();
    handleClose();
  };
  const fileUrl = getValues('fileUrl');
  useEffect(() => {
    setImageUrl('');
    if (isValidImageUrl(fileUrl)) {
      setImageUrl(fileUrl as string);
    }
  }, [fileUrl]);
  const { data: goalData } = useInfiniteGoalsQuery(1000);
  const goals = goalData?.pages.map((page) => page.goals).flat();

  return (
    <ModalContent className='sm:w-[520px] sm:h-auto w-full h-full p-4 sm:p-6 flex flex-col animate-slide-up sm:rounded-xl rounded-none'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full'>
        <div className='flex gap-2 flex-col'>
          <div className='flex justify-between items-center'>
            <h1 className='text-lg font-bold'>할 일 생성</h1>
            <ModalClose />
          </div>
        </div>
        <InputSlid
          label='제목'
          placeholder='할 일의 제목을 적어주세요'
          error={errors.title?.message}
          labelClassName="relative after:content-['*'] after:ml-0.5 after:text-red-500"
          {...register('title')}
        />
        <InputSlid
          label='링크'
          placeholder='링크를 입력하세요'
          {...register('linkUrl')}
          error={errors?.linkUrl?.message}
        />
        <FileUpload<TodoAddFormData>
          register={register}
          setValue={setValue}
          watch={watch}
          error={errors.fileUrl?.message}
        />
        {imageUrl && <Image src={imageUrl} alt='미리보기' width={100} height={100} unoptimized />}
        <GoalSelector
          label='목표'
          placeholder='목표를 선택해주세요'
          goals={goals}
          onSelect={(goalId) => setValue('goalId', goalId)}
          selectedGoalId={watch('goalId')}
        />
        <div className='mt-10'>
          <Button type='submit' className='w-full'>
            확인
          </Button>
        </div>
      </form>
    </ModalContent>
  );
};

const TodoAddModal: React.FC<TodoAddModalProps> = ({ goalId, isOpen, onChangeIsOpen }) => {
  // isOpen이 false일 때는 아무것도 렌더링하지 않음
  if (!isOpen) return null;

  return (
    <ModalProvider isOpen={isOpen} onChangeIsOpen={onChangeIsOpen}>
      <Content goalId={goalId} />
    </ModalProvider>
  );
};

export default TodoAddModal;
