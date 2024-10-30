import { forwardRef } from 'react';
import { ModalClose, ModalContent, ModalProvider, ModalTrigger, useModalContext } from '../../common/Modal';
import { Todo } from '@/lib/types/todos';
import InputSlid from '../../common/InputSlid';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FileUpload from './ButtonUploadFile';
import CheckboxToggle from './CheckboxToggle';
import useInfiniteGoalsQuery from '@/lib/hooks/useInfiniteGoalsQuery';
import Button from '@/components/common/ButtonSlid';
import { TodoEditFormData, todoEditSchema } from '@/lib/schemas/todosSchemas';
import { useUpdateTodoMutation } from '@/lib/hooks/useUpdateTodoMutation';
import cleanedFormData from '@/lib/utils/cleanedFormData';
import GoalSelector from './GoalSelector';

interface TodoEditModalProps {
  data: Todo;
  children?: React.ReactNode;
}

const Content = ({ data }: { data: Todo }) => {
  const { handleClose } = useModalContext();
  const editTodo = useUpdateTodoMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TodoEditFormData>({
    resolver: zodResolver(todoEditSchema),
    defaultValues: {
      title: data.title,
      fileUrl: data.fileUrl || '',
      linkUrl: data.linkUrl || '',
      goalId: data.goal?.id || null,
      done: data.done,
    },
  });

  const onSubmit = (update: TodoEditFormData) => {
    const cleanedData = cleanedFormData(update);
    editTodo.mutate({ id: Number(data.id), updates: cleanedData });
    handleClose();
  };

  const { data: goalData } = useInfiniteGoalsQuery(1000);
  const goals = goalData?.pages.map((page) => page.goals).flat();
  return (
    <ModalContent className='sm:w-[520px] sm:h-[676px] w-full h-full p-4 sm:p-6 flex flex-col'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <div className='flex gap-2 flex-col'>
          <div className='flex justify-between items-center'>
            <h1 className='text-lg font-bold'>할 일 수정</h1>
            <ModalClose />
          </div>
          <CheckboxToggle
            done={watch('done')}
            onChange={(value) => setValue('done', value, { shouldValidate: true, shouldDirty: true })}
          />
        </div>
        <InputSlid
          label='제목'
          placeholder='할 일의 제목을 적어주세요'
          error={errors.title?.message}
          {...register('title')}
        />
        <InputSlid
          label='링크'
          placeholder='링크를 입력하세요'
          {...register('linkUrl')}
          error={errors?.linkUrl?.message}
        />
        <FileUpload<TodoEditFormData>
          register={register}
          setValue={setValue}
          watch={watch}
          error={errors.fileUrl?.message}
        />
        {/* <InputSlid
          label='목표'
          type='select'
          placeholder='정해진 목표가 없습니다'
          {...register('goalId')}
          options={goals && goals.map((goal) => ({ value: goal.id, label: goal.title }))}
        /> */}
        <GoalSelector
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

const TodoEditModal = forwardRef<HTMLButtonElement, TodoEditModalProps>(({ children, data }, ref) => {
  return (
    <ModalProvider>
      <ModalTrigger ref={ref}>{children}</ModalTrigger>
      <Content data={data} />
    </ModalProvider>
  );
});

TodoEditModal.displayName = 'TodoModal';

export default TodoEditModal;
