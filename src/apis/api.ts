import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';

import { HTTP_STATUS_CODE } from '@/config/constants';
import { getAccessToken } from '@/stores/user';
import { isHasValue } from '@/utils/validate';
import { refreshTokenApi } from './auth';

type AxiosRetry = AxiosError['config'] & { _retry: boolean };

const instance = axios.create();

const refreshTokenFn = async () => {
  const _refreshToken = localStorage.getItem('refreshToken');

  try {
    if (!_refreshToken) throw new Error('ERR: refresh token is not exist');
    const response = await refreshTokenApi(_refreshToken);

    if (!response) throw new Error('ERR: refresh token api error');

    localStorage.setItem('refreshToken', JSON.stringify(response.refreshToken));
    localStorage.setItem('accessToken', JSON.stringify(response.accessToken));

    return response;
  } catch (error) {
    localStorage.removeItem('session');
    localStorage.removeItem('user');
    throw Error('ERR: unauthorized');
  }
};

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRetry;
    if (!originalRequest) return Promise.reject(error);

    const isUnauthorized = error.response?.status === HTTP_STATUS_CODE.UNAUTHORIZED;
    const isNotRetry = !originalRequest._retry;

    if (isUnauthorized && isNotRetry) {
      originalRequest._retry = true;

      return refreshTokenFn()
        .then((res) => {
          originalRequest.headers.Authorization = `Bearer ${res.accessToken}`;
          return instance(originalRequest);
        })
        .catch(() => Promise.reject(error));
    }

    return Promise.reject(error);
  }
);

export const apiRequest = async <Data = unknown, Response = AxiosResponse<Data>>(
  config: AxiosRequestConfig
): Promise<Response> => {
  const accessToken = await getAccessToken();

  return instance.request({
    ...config,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
      ...config.headers,
    },
  });
};

export const apiGet = async <Data = unknown, Response = AxiosResponse<Data>>(
  url: string,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig
): Promise<Response> => {
  const query = params
    ? `?${Object.keys(params)
        .map((key) => (isHasValue(params[key]) ? `${key}=${params[key]}` : ''))
        .filter(Boolean)
        .join('&')}`
    : '';

  return apiRequest<Data, Response>({
    url: `${url}${query}`,
    method: 'GET',
    ...config,
  });
};

export const apiPost = async <Data = unknown, Response = AxiosResponse<Data>>(
  url: string,
  data?: Data,
  config?: AxiosRequestConfig
) => {
  return apiRequest<Data, Response>({
    url,
    data: data ?? null,
    method: 'POST',
    ...config,
  });
};

export const apiPut = async <Data = unknown, Response = AxiosResponse<Data>>(
  url: string,
  data?: Data,
  config?: AxiosRequestConfig
) => {
  return apiRequest<Data, Response>({
    url,
    data: data ?? null,
    method: 'PUT',
    ...config,
  });
};

export const apiPatch = async <Data = unknown, Response = AxiosResponse<Data>>(
  url: string,
  data?: Data,
  config?: AxiosRequestConfig
) => {
  return apiRequest<Data, Response>({
    url,
    data: data ?? null,
    method: 'PATCH',
    ...config,
  });
};

export const apiDelete = async <Data = unknown, Response = AxiosResponse<Data>>(
  url: string,
  config?: AxiosRequestConfig
) => {
  return apiRequest<Data, Response>({
    url,
    method: 'DELETE',
    ...config,
  });
};
