import { API_BASE_URL } from '@/constants';
import { SignupFormRequest, SignupResponse } from '../types/auth';
import baseFetch from './baseFetch';

export const signUp = async (data: SignupFormRequest): Promise<SignupResponse> => {
  const response = await baseFetch(`${API_BASE_URL}/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return response;
};
