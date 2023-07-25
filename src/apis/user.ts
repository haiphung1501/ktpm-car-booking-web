import type { User } from '@/types/user';
import { API_URL } from '@/utils/env';
import { apiGet } from './api';

const USER_URL = {
  getAll: API_URL + '/api/user/all',
};

type GetAllUserParam = {
  limit?: number;
  page?: number;
  role?: string;
};

type GetAllUserResponse = {
  success: boolean;
  users: User[];
  usersCount: number;
  resultPerPage: number;
  filteredUsersCount: number;
};

export const getAllUser = async (params: GetAllUserParam) => {
  try {
    const res = await apiGet<GetAllUserParam, ApiDataResponse<GetAllUserResponse>>(
      USER_URL.getAll,
      params
    );
    return res.data;
  } catch {
    return null;
  }
};
