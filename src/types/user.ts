import type { Car } from './car';

export type User = {
  avatar: Avatar;
  address: string;
  driverRating: number;
  isDeleted: boolean;
  _id: string;
  email: string;
  password: string;
  role: string;
  verified: boolean;
  __v: number;
  cars: Car[];
  current_location: unknown[];
  is_deleted: boolean;
  rating: number;
  driver_rating: number;
};

export type Avatar = {
  public_id: string;
  url: string;
};
