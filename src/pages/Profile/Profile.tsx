import { Button, Rating } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';

import { deleteUser, getUserById } from '@/apis/user';

const ProfileDriver = () => {
  const { id } = useParams();
  const { isLoading, data, refetch } = useQuery({
    queryKey: ['getUserById', id],
    queryFn: () => getUserById(id as string),
  });

  const { mutate } = useMutation({
    mutationFn: () => deleteUser(id as string),
    onSuccess: () => {
      notifications.show({
        withCloseButton: true,
        color: 'green',
        title: 'Action success!',
        message: 'Delete success',
      });
      refetch();
    },
    onError: () => {
      notifications.show({
        withCloseButton: true,
        color: 'green',
        title: 'Action fail!',
        message: 'Delete fail',
      });
    },
  });

  if (isLoading) return <div>Loanding...</div>;
  if (!data) return <div>User does not exist</div>;

  return (
    <div className="px-10 py-5">
      <div className="flex items-center gap-3">
        <img
          alt="avatar"
          src={
            data.user.avatar.url ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlR3hMw_3daUL3Uhr5Y3uJh_kMaYzyqQhhPA&usqp=CAU'
          }
          width={150}
          height={150}
          className="rounded-full"
        />
        <div>
          <div>Tên: {data.user.displayName}</div>
          <div>Role: {data.user.role}</div>
          <div>Addredd: {data.user.address || '-'}</div>
          <div>Email: {data.user.email}</div>
          {data.user.role === 'driver' && <div>Rating: {data.user.driverRating}</div>}
        </div>
        <div className="ml-auto">
          {!data.user.isDeleted && (
            <Button onClick={() => mutate()} variant="filled" color="red">
              Delete
            </Button>
          )}
        </div>
      </div>
      {data.user.role !== 'user' && (
        <>
          <h1 className="mt-8 text-xl font-bold">Reviews</h1>
          <div className="mt-2 grid grid-cols-2 gap-4">
            {data.user.driverReviews.map((review) => (
              <div key={review._id} className="rounded-lg p-4 shadow">
                <Link to={`/admin/profile/${review.user}`} className="text-blue-500 underline">
                  User: {review.user}
                </Link>
                <div>Name: {review.name}</div>
                <div>Comment: {review.comment}</div>
                <div className="flex items-center gap-1">
                  Rating: <Rating value={review.rating} readOnly />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <h1 className="mt-8 text-xl font-bold">Bookings</h1>
      <div className="mt-2 grid grid-cols-2 gap-4">
        {data.bookings.map((booking) => (
          <Link to={`/admin/booking/${id}`} key={booking._id} className="rounded-lg p-4 shadow">
            <div>Booking Id: {booking._id}</div>
            <div>Pick Address: {booking.pickupAddress.fullAddress}</div>
            <div>Destination Adredd: {booking.destinationAddress.fullAddress}</div>
            <div>Price: {booking.price}</div>
            <div>User: {booking.userId.displayName}</div>
            <Link to={`/admin/profile/${booking.userId._id}`} className="text-blue-500 underline">
              User Id: {booking.userId._id}
            </Link>
            {booking.driverId && (
              <>
                <div>Driver: {booking.driverId.displayName}</div>
                <Link
                  to={`/admin/profile/${booking.driverId._id}`}
                  className="text-blue-500 underline"
                >
                  Driver Id: {booking.driverId._id}
                </Link>
              </>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfileDriver;
