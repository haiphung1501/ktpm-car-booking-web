import { setAccessToken } from '@/stores/user';
import type { User } from '@/types/user';
import { API_URL } from '@/utils/env';
import { apiPost } from './api';

const AUTH_URL = {
  login: API_URL + '/api/user/login',
  logout: API_URL + '/api/user/logout',
};

type LoginApiParam = {
  email: string;
  password: string;
};

type LoginApiResponse = {
  success: boolean;
  user: User;
  token: string;
};

export const loginApi = async (data: LoginApiParam) => {
  try {
    const res = await apiPost<LoginApiParam, ApiDataResponse<LoginApiResponse>>(
      AUTH_URL.login,
      data
    );
    setAccessToken(res.data.token);
    return res.data;
  } catch {
    return null;
  }
};

type LogoutApiResponse = {
  success: boolean;
  message: string;
};

export const logoutApi = async (): Promise<LogoutApiResponse | null> => {
  try {
    const res = await apiPost<null, ApiDataResponse<LogoutApiResponse>>(AUTH_URL.logout);
    return res.data;
  } catch {
    return null;
  }
};
