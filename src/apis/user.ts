import { Booking } from '@/types/booking';
import type { User, UserDetail } from '@/types/user';
import { API_URL } from '@/utils/env';
import { apiGet, apiPost, apiPut } from './api';

const USER_URL = {
  getAll: API_URL + '/api/user/all',
  getMe: API_URL + '/api/user/me',
  updatePassword: API_URL + '/api/user/updatepassword',
  getUserById: API_URL + '/api/user',
  deleteUser: API_URL + '/api/user/delete',
  register: API_URL + '/api/user/register',
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

type GetUserByIdResponse = {
  success: boolean;
  user: UserDetail;
  bookings: Booking;
};

export const getUserById = async (id: string) => {
  try {
    const res = await apiGet<GetAllUserParam, ApiDataResponse<GetUserByIdResponse>>(
      USER_URL.getUserById + `/${id}`
    );
    return res.data;
  } catch {
    return null;
  }
};

type GetUserProfileResponse = {
  success: boolean;
  user: User;
};

export const getUserProfile = async () => {
  try {
    const res = await apiGet<null, ApiDataResponse<GetUserProfileResponse>>(USER_URL.getMe);
    return res.data;
  } catch {
    return null;
  }
};

export type UpdatePasswordParams = {
  oldPassword: string;
  newPassword: string;
};

export const updatePassword = async (data: UpdatePasswordParams) => {
  const res = await apiPost(USER_URL.updatePassword, data);
  return res.data;
};

export const deleteUser = async (id: string) => {
  const res = await apiPut(USER_URL.deleteUser + `/${id}`);
  return res.data;
};

export const registerUser = async (data: { email: string; password: string }) => {
  const res = await apiPost(USER_URL.register, data);
  return res.data;
};
