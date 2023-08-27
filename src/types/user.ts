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
  displayName: string;
};

export type Avatar = {
  public_id: string;
  url: string;
};

export type UserDetail = {
  avatar: Avatar;
  currentLocation: Ation;
  _id: string;
  email: string;
  password: string;
  role: string;
  verified: boolean;
  __v: number;
  cars: string[];
  is_deleted?: boolean;
  driverRating: number;
  isDeleted: boolean;
  address: string;
  displayName: string;
  car?: string;
  driverNumOfReviews: number;
  driverReviews: DriverReview[];
  driverAvailable?: boolean;
};

export type Ation = {
  lat: number;
  lng: number;
};

export type Address = {
  name: string;
  fullAddress: string;
};

export type DriverReview = {
  booking: string;
  user: string;
  name: string;
  rating: number;
  comment: string;
  _id: string;
};
