import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';

import { getDetailBooking } from '@/apis/booking';

const Booking = () => {
  const { id } = useParams();
  const { isLoading, data } = useQuery({
    queryKey: ['getUserById', id],
    queryFn: () => getDetailBooking(id as string),
  });

  if (isLoading) return 'Loading..';
  if (!data || !data.booking) return 'Booking dose not exist';

  return (
    <div className="flex flex-col gap-3 px-10 py-5">
      <div className="mb-3 text-3xl font-bold">Booking Details</div>
      <div className="flex items-center gap-3">
        <b>Booking Id:</b> <span>{data?.booking._id}</span>
      </div>
      <div className="flex items-center gap-3">
        <b>User Id:</b>
        <Link to={`/admin/profile/${data?.booking.userId._id}`}>{data?.booking.userId._id}</Link>
      </div>
      <div className="flex items-center gap-3">
        <b>Driver Id:</b>
        <Link to={`/admin/profile/${data?.booking.userId._id}`}>
          {data?.booking.driverId?._id || '-'}
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <b>User:</b> <span>{data?.booking.userId.displayName}</span>
      </div>
      <div className="flex items-center gap-3">
        <b>Driver:</b> <span>{data?.booking.driverId?.displayName || '-'}</span>
      </div>
      <div className="flex items-center gap-3">
        <b>Price:</b>
        <span>{data?.booking.price + ' VND/' + data?.booking.distance / 1000 + ' km'}</span>
      </div>
      <div className="flex items-center gap-3">
        <b>Pickup Address:</b> <span>{data?.booking.pickupAddress.fullAddress}</span>
      </div>
      <div className="flex items-center gap-3">
        <b>Destination Address:</b> <span>{data?.booking.destinationAddress.fullAddress}</span>
      </div>
    </div>
  );
};

export default Booking;
