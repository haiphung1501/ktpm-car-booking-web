import { Booking } from '@/types/booking';
import { API_URL } from '@/utils/env';
import { apiGet } from './api';

const BOOKING_URL = {
  getAll: API_URL + '/api/booking/all',
  getDetail: API_URL + '/api/booking',
};

export type GetAllBookingResponse = {
  success: boolean;
  bookings: Booking[];
};

export const getAllBookings = async () => {
  try {
    const res = await apiGet<null, ApiDataResponse<GetAllBookingResponse>>(BOOKING_URL.getAll);
    return res.data;
  } catch (error) {
    return null;
  }
};

export type GetDetailBookingResponse = {
  success: boolean;
  booking: Booking;
};

export const getDetailBooking = async (id: string) => {
  try {
    const res = await apiGet<null, ApiDataResponse<GetDetailBookingResponse>>(
      BOOKING_URL.getDetail + `/${id}`
    );
    return res.data;
  } catch (error) {
    return null;
  }
};
