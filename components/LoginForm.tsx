'use client';

import Button from './common/ButtonSlid';
import InputSlid from './common/InputSlid';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData, loginSchema } from '@/lib/schemas/authSchemas';
import { login } from '@/lib/api/login';
import { setUserToStorage } from '@/lib/utils/auth';
import { parseAuthError } from '@/lib/utils/parseError';
import { HttpError } from '@/lib/api/errorHandlers';
import { useRouter } from 'next/navigation';
import useToast from './common/toast/useToast';
import { useEffect } from 'react';

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });
  const router = useRouter();
  const toast = useToast();
  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const response = await login(data);
      setUserToStorage(response.user);
      toast.toast({
        title: '로그인 성공',
        variant: 'success',
      });
      router.refresh();
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
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 w-[343px] sm:w-[640px]'>
      <InputSlid
        type='text'
        label='이메일'
        placeholder='이메일을 입력해주세요'
        error={errors.email?.message}
        {...register('email')}
      />
      <InputSlid
        type='password'
        label='비밀번호'
        placeholder='비밀번호를 입력해주세요'
        error={errors.password?.message}
        {...register('password')}
      />
      <Button className='w-full' type='submit' disabled={isSubmitting}>
        로그인하기
      </Button>
      {errors.root?.serverError && (
        <span className='mt-1 ml-4 text-red-700 text-xs sm:text-sm'>{errors.root?.serverError.message}</span>
      )}
    </form>
  );
};

export default LoginForm;
