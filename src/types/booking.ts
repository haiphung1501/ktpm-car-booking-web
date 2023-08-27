export type Booking = {
  paymentStatus: string;
  driverLocation?: Ation;
  pickupAddress: Address;
  destinationAddress: Address;
  pickupLocation: Ation;
  destination: Ation;
  _id: string;
  userId: ErID;
  carType: string;
  bookingStatus: string;
  distance: number;
  price: number;
  duration: number;
  currentTime: Date;
  isReviewed: boolean;
  isDeleted: boolean;
  messages: string[];
  __v: number;
  carId?: string;
  driverId?: ErID;
  pickupTime?: Date;
  dropOffTime?: Date;
};

export type Ation = {
  lat: number;
  lng: number;
};

export type Address = {
  name: string;
  fullAddress: string;
};

export type ErID = {
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

export type Avatar = {
  public_id: string;
  url: string;
};

export type DriverReview = {
  booking: string;
  user: string;
  name: string;
  rating: number;
  comment: string;
  _id: string;
};
