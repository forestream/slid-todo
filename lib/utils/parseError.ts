import { AUTH_ERROR_MESSAGES } from '@/constants';

export type ErrorField = 'email' | 'password' | 'root.serverError';

export interface AuthError {
  field: ErrorField;
  message: string;
}

export const parseAuthError = (error: Error): AuthError => {
  const errorMessage = error.message.toLowerCase();

  if (errorMessage.includes('이메일')) {
    return {
      field: 'email',
      message: error.message,
    };
  }

  if (errorMessage.includes('비밀번호')) {
    return {
      field: 'password',
      message: error.message,
    };
  }

  return {
    field: 'root.serverError',
    message: AUTH_ERROR_MESSAGES.SERVER_ERROR,
  };
};
