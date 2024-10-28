import { forwardRef } from 'react';
import { ModalClose, ModalContent, ModalProvider, ModalTrigger } from '../../common/Modal';
import { Todo } from '@/lib/types/todos';
import InputSlid from '../../common/InputSlid';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FileUpload from './ButtonUploadFile';
import CheckboxToggle from './CheckboxToggle';
import useInfiniteGoalsQuery from '@/lib/hooks/useInfiniteGoalsQuery';
import Button from '@/components/common/ButtonSlid';

const todoEditSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  fileUrl: z.string().optional(),
  linkUrl: z
    .string()
    .optional()
    .transform((value) => (value === '' ? null : value))
    .refine((value) => !value || /^(https?:\/\/)/.test(value), {
      message: '유효한 URL을 입력해주세요',
    }),
  goalId: z
    .preprocess((value) => {
      if (typeof value === 'string') {
        const parsed = Number(value);
        return isNaN(parsed) ? null : parsed;
      }
      return value;
    }, z.number().nullable().optional())
    .transform((value) => (typeof value === 'number' ? value : null)),
  done: z.boolean(),
});

export type TodoFormData = z.infer<typeof todoEditSchema>;

interface TodoModalProps {
  title: string;
  data: Todo;
  children?: React.ReactNode;
}

const TodoEditModal = forwardRef<HTMLButtonElement, TodoModalProps>(({ children, data, title }, ref) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoEditSchema),
    defaultValues: {
      title: data.title,
      fileUrl: data.fileUrl || '',
      linkUrl: data.linkUrl || '',
      goalId: data.goal?.id || null,
      done: data.done,
    },
  });
  console.log(data.goal?.id);
  const onSubmit = (data: TodoFormData) => {
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
              <h1 className='text-lg font-bold'>{title}</h1>
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

TodoEditModal.displayName = 'TodoModal';

export default TodoEditModal;
