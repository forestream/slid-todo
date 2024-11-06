import { LoginFormData, LoginResponse } from '../types/auth';
import baseFetch from './baseFetch';

export const login = async (data: LoginFormData): Promise<LoginResponse> => {
  const response = await baseFetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response;
};
