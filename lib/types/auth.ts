export interface LoginFormData {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  user: User;
  refreshToken: string;
  accessToken: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  user: {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}
