'use client';

import { SignupFormData, signupSchema } from '@/lib/schemas/authSchemas';
import Button from './common/ButtonSlid';
import InputSlid from './common/InputSlid';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signUp } from '@/lib/api/signUp';
import { useState } from 'react';
import IconCheck from '@/public/icons/IconCheck';
import SignupSuccessModal from './modal/SignupSuccessModal';
import { useEmailValidation } from '@/lib/hooks/useEmailValidation';
import { SignupFormRequest } from '@/lib/types/auth';
import { parseAuthError } from '@/lib/utils/parseError';
import { HttpError } from '@/lib/api/errorHandlers';

const SignUpForm: React.FC = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
  });

  const email = watch('email');
  const { isEmailAvailable } = useEmailValidation(email, setError);

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    const signupData: SignupFormRequest = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await signUp(signupData);
      console.log(response);
      setIsSuccessModalOpen(true);
    } catch (error) {
      if (error instanceof HttpError) {
        const { field, message } = parseAuthError(error);
        setError(field, {
          type: 'manual',
          message,
        });
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 w-[343px] sm:w-[640px]'>
        <InputSlid
          type='text'
          label='이름'
          placeholder='이름을 입력해주세요'
          {...register('name')}
          error={errors.name?.message}
        />
        <div className='relative'>
          <InputSlid
            type='text'
            label='이메일'
            placeholder='이메일을 입력해주세요'
            {...register('email')}
            error={errors.email?.message}
          />
          {isEmailAvailable && email && (
            <div className='absolute left-2 -bottom-6 flex items-center text-link'>
              <IconCheck />
              <span className='ml-1 text-sm'>사용 가능한 이메일입니다</span>
            </div>
          )}
        </div>
        <InputSlid
          type='password'
          label='비밀번호'
          placeholder='비밀번호를 입력해주세요'
          {...register('password')}
          error={errors.password?.message}
        />
        <InputSlid
          type='password'
          label='비밀번호 확인'
          placeholder='비밀번호를 다시 한 번 입력해주세요'
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
        <Button className='w-full' type='submit' disabled={isSubmitting}>
          회원가입하기
        </Button>
        {errors.root?.serverError && (
          <span className='mt-1 ml-4 text-red-700 text-xs sm:text-sm'>{errors.root?.serverError.message}</span>
        )}
      </form>
      <SignupSuccessModal isOpen={isSuccessModalOpen} onChangeIsOpen={setIsSuccessModalOpen} />
    </>
  );
};

export default SignUpForm;
