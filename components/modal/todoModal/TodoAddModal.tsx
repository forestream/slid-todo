import { forwardRef } from 'react';
import { ModalClose, ModalContent, ModalProvider, ModalTrigger } from '../../common/Modal';
import InputSlid from '../../common/InputSlid';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FileUpload from './ButtonUploadFile';
import useInfiniteGoalsQuery from '@/lib/hooks/useInfiniteGoalsQuery';
import Button from '@/components/common/ButtonSlid';
import { TodoEditFormData, todoEditSchema } from '@/lib/schemas/todosSchemas';

interface TodoAddModalProps {
  children?: React.ReactNode;
}

const TodoAddModal = forwardRef<HTMLButtonElement, TodoAddModalProps>(({ children }, ref) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TodoEditFormData>({
    resolver: zodResolver(todoEditSchema),
    defaultValues: {
      title: '',
      fileUrl: '',
      linkUrl: '',
      goalId: null,
      done: false,
    },
  });

  const onSubmit = (data: TodoEditFormData) => {
    console.log('submit');
    console.log(data);
  };

  const { data: goalData } = useInfiniteGoalsQuery(1000);
  const goals = goalData?.pages.map((page) => page.goals).flat();

  return (
    <ModalProvider>
      <ModalTrigger ref={ref}>{children}</ModalTrigger>
      <ModalContent className='sm:w-[520px] sm:h-[676px] w-full h-full p-4 sm:p-6 flex flex-col'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
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
            {...register('title')}
          />
          <InputSlid
            label='링크'
            placeholder='링크를 입력하세요'
            {...register('linkUrl')}
            error={errors?.linkUrl?.message}
          />
          <FileUpload register={register} setValue={setValue} watch={watch} error={errors.fileUrl?.message} />
          <InputSlid
            label='목표'
            type='select'
            placeholder='정해진 목표가 없습니다'
            {...register('goalId')}
            options={goals && goals.map((goal) => ({ value: goal.id, label: goal.title }))}
          />
          <div className='mt-10'>
            <Button type='submit' className='w-full'>
              확인
            </Button>
          </div>
        </form>
      </ModalContent>
    </ModalProvider>
  );
});

TodoAddModal.displayName = 'TodoAddModal';

export default TodoAddModal;
