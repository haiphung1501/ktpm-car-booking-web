import { Anchor, LoadingOverlay, ScrollArea, Table } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { getAllBookings } from '@/apis/booking';
import { classNames } from '@/utils/classNames';

const Orders = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['getAllBookings'],
    queryFn: getAllBookings,
  });

  return (
    <ScrollArea className="mx-6 my-4">
      <Table
        className={classNames('relative  w-full', { 'min-h-[400px]': isLoading })}
        verticalSpacing="lg"
      >
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <thead>
          <tr>
            <th>ID</th>
            <th>UserId</th>
            <th>CarType</th>
            <th>Booking Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.bookings.map((booking) => (
            <tr key={booking._id}>
              <td>
                <Link to={`/admin/booking/${booking._id}`}>
                  <Anchor component="button" fz="sm">
                    {booking._id}
                  </Anchor>
                </Link>
              </td>
              <td>
                <Link to={`/admin/profile/${booking.userId._id}`}>
                  <Anchor component="button" fz="sm">
                    {booking.userId.displayName}
                  </Anchor>
                </Link>
              </td>
              <td>{booking.carType}</td>
              <td>{booking.bookingStatus}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ScrollArea>
  );
};

export default Orders;
