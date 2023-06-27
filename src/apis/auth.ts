import { setAccessToken } from '@/stores/user';

type TokenReponse = {
  accessToken: string;
  refreshToken: string;
};

type LoginApiParam = {
  email: string;
  password: string;
  remember: boolean;
};

export const loginApi = async (data: LoginApiParam) => {
  try {
    return new Promise((resolve) => {
      if (data.email !== 'test@gmail.com') throw new Error('');
      const res = { accessToken: 'abc', refreshToken: 'abc', user: { id: 1, ...data } };

      if (data.remember) {
        localStorage.setItem('refreshToken', res.refreshToken);
      }
      setAccessToken(res.accessToken);

      setTimeout(() => resolve(res), 200);
    });
  } catch {
    return null;
  }
};

export const refreshTokenApi = async (token: string): Promise<TokenReponse | null> => {
  try {
    return new Promise((resolve) => {
      const res = { accessToken: token + 'bcd', refreshToken: 'bcd' };
      setTimeout(() => resolve(res), 200);
    });
  } catch {
    return null;
  }
};
