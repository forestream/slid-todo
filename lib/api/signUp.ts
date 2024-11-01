import { API_BASE_URL } from '@/constants';
import { SignupFormData, SignupResponse } from '../types/auth';

export const signUp = async (data: SignupFormData): Promise<SignupResponse> => {
  const response = await fetch(`${API_BASE_URL}/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  return response.json();
};
