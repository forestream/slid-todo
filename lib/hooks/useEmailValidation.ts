import { useState, useEffect, useRef } from 'react';
import { UseFormSetError } from 'react-hook-form';
import { SignupFormData } from '../schemas/authSchemas';
import { AUTH_ERROR_MESSAGES, EMAIL_VALIDATION_DELAY } from '@/constants';

export const useEmailValidation = (email: string, setError: UseFormSetError<SignupFormData>) => {
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  const validateEmailFormat = (email: string) => {
    const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(email);
    if (hasKorean) {
      return {
        type: 'korean',
        message: AUTH_ERROR_MESSAGES.EMAIL_KOREAN,
      };
    }
    return null;
  };

  const checkEmailAvailability = async (email: string) => {
    try {
      const response = await fetch('/4-4-dev/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password: 'passwordToTestEmail' }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();

        if (error.message.includes('가입')) {
          return null; // 사용 가능한 이메일
        }

        if (error.message.includes('비밀번호가 올바르지')) {
          return {
            type: 'duplicate',
            message: AUTH_ERROR_MESSAGES.EMAIL_DUPLICATE,
          };
        }

        return {
          type: 'server',
          message: error.message || AUTH_ERROR_MESSAGES.EMAIL_VALIDATION_FAILED,
        };
      }

      return {
        type: 'invalid',
        message: AUTH_ERROR_MESSAGES.EMAIL_VALIDATION_FAILED,
      };
    } catch (error) {
      console.error(error);
      return {
        type: 'server',
        message: AUTH_ERROR_MESSAGES.SERVER_ERROR,
      };
    }
  };

  useEffect(() => {
    const validateEmail = async (email: string) => {
      setIsEmailAvailable(false);

      // 기본 포맷 검증
      const formatError = validateEmailFormat(email);
      if (formatError) {
        setError('email', {
          type: 'manual',
          message: formatError.message,
        });
        return;
      }

      // 서버 측 검증
      const availabilityError = await checkEmailAvailability(email);
      if (availabilityError) {
        setError('email', {
          type: 'manual',
          message: availabilityError.message,
        });
        return;
      }

      setError('email', {
        type: 'manual',
        message: '',
      });
      setIsEmailAvailable(true);
    };

    if (!email) {
      setIsEmailAvailable(false);
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      validateEmail(email);
    }, EMAIL_VALIDATION_DELAY);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [email, setError]);

  return { isEmailAvailable };
};
