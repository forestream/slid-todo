'use client';

import { SignupFormData, signupSchema } from '@/lib/schemas/authSchemas';
import Button from './common/ButtonSlid';
import InputSlid from './common/InputSlid';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signUp } from '@/lib/api/signUp';
import { useEffect, useRef, useState } from 'react';
import IconCheck from '@/public/icons/IconCheck';
import SignupSuccessModal from './modal/SignupSuccessModal';

const SignUpForm: React.FC = () => {
  const modalRef = useRef<HTMLButtonElement>(null);
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean>(false);

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

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    // 인자로 받은 data에서 confirmPassword 필드를 제외한 나머지 값을 패치에 사용
    const fetchData = { name: data.name, email: data.email, password: data.password };
    try {
      setIsEmailAvailable(false);
      const response = await signUp(fetchData);
      console.log(response);

      modalRef.current?.click();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('이메일')) {
          setError('email', {
            type: 'manual',
            message: error.message,
          });
        } else if (error.message.includes('비밀번호')) {
          setError('password', {
            type: 'manual',
            message: error.message,
          });
        } else {
          // 일반적인 에러의 경우 비밀번호 필드에 표시 (임시)
          setError('password', {
            type: 'manual',
            message: error.message,
          });
        }
      }
    }
  };

  const email = watch('email');

  // 디바운스를 위한 타이머 ref
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const validateEmail = async (email: string) => {
      setIsEmailAvailable(false);
      try {
        // 여기에 이메일 검증 API 호출
        const password = 'passwordToTestEmail';
        const response = await fetch('/4-4-dev/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 404) {
          setError('email', {
            type: 'manual',
            message: '',
          });
          setIsEmailAvailable(true);
          return;
        }

        if (!response.ok) {
          const error = await response.json();
          console.log(error.message);
          if (error.message.includes('비밀번호가 올바르지')) {
            setError('email', {
              type: 'manual',
              message: '이미 사용중인 이메일입니다.',
            });
            return;
          }
          setError('email', {
            type: 'manual',
            message: error.message || '이메일 검증에 실패했습니다.',
          });
        }
        setIsEmailAvailable(false);
      } catch (error) {
        if (error instanceof Error) {
          setError('email', {
            type: 'manual',
            message: error.message,
          });
          setIsEmailAvailable(false);
        }
      }
    };

    setIsEmailAvailable(false);
    if (!email) {
      return;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      validateEmail(email);
    }, 1200);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [email, setError]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 w-[343px] sm:w-[640px]'>
        <InputSlid
          type='text'
          label='이름'
          placeholder='이름를 입력해주세요'
          {...register('name')}
          error={errors.name?.message}
        />
        <div className=' relative'>
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
      </form>
      <SignupSuccessModal ref={modalRef} />
    </>
  );
};

export default SignUpForm;
