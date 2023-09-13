/* eslint-disable @typescript-eslint/no-explicit-any */
import { RingProgress } from '@mantine/core';
import { IconCar, IconCoin, IconReceipt2, IconUser } from '@tabler/icons-react';
import { useQueries } from '@tanstack/react-query';
import dayjs from 'dayjs';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { getAllBookings } from '@/apis/booking';
import { getAllUser } from '@/apis/user';
import { classNames } from '@/utils/classNames';

const Dashboard = () => {
  const [userQuery, driverQuery, bookingQuery] = useQueries({
    queries: [
      { queryFn: () => getAllUser({ role: 'user' }), queryKey: ['getAllUser'] },
      { queryFn: () => getAllUser({ role: 'driver' }), queryKey: ['getAllDrivers'] },
      { queryFn: () => getAllBookings(), queryKey: ['getAllBookings'] },
    ],
  });

  const VND = new Intl.NumberFormat('vi', {
    style: 'currency',
    currency: 'VND',
  });

  const chart = bookingQuery.data?.bookings.reduce((chartData: any[], b) => {
    const date = dayjs(b.currentTime).format('DD/MM/YYYY');

    const index = chartData.findIndex((d: any) => {
      return d.date === date;
    });

    if (index >= 0) {
      chartData[index] = {
        ...chartData[index],
        [b.bookingStatus]: (chartData[index][b.bookingStatus] || 0) + 1,
        total:
          b.bookingStatus === 'completed'
            ? chartData[index].total + b.price
            : chartData[index].total,
      };
      return chartData;
    } else {
      return [
        ...chartData,
        {
          date,
          [b.bookingStatus]: 1,
          total: b.bookingStatus === 'completed' ? b.price : 0,
        },
      ];
    }
  }, []);

  console.log(chart);

  return (
    <div className="min-h-[calc(100vh-50px)] bg-gray-100">
      <div className="h-[150px] rounded-b-2xl bg-cyan-600 px-10 py-5 text-white">
        <div className="text-2xl font-bold">Welcome Ann Nullpointe!</div>
        <div className="text-base">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </div>
        <div className="mt-4 flex w-full gap-10">
          <div className="flex items-center rounded-2xl bg-white p-2 text-black shadow-md">
            <RingProgress
              size={80}
              label={
                <div className={classNames('flex items-center justify-center rounded-full')}>
                  <IconUser size={30} />
                </div>
              }
              thickness={8}
              roundCaps
              sections={[{ value: 100, color: 'orange' }]}
            />
            <div className="pr-2">
              <div className="font-medium text-gray-400">Tổng Số User</div>
              <div className="text-sm font-medium">{userQuery.data?.users.length}</div>
            </div>
          </div>
          <div className="flex items-center rounded-2xl bg-white p-2 text-black shadow-md">
            <RingProgress
              size={80}
              label={
                <div className={classNames('flex items-center justify-center rounded-full')}>
                  <IconCar size={30} />
                </div>
              }
              thickness={8}
              roundCaps
              sections={[{ value: 100, color: 'green' }]}
            />
            <div className="pr-2">
              <div className="font-medium text-gray-400">Tổng Số Driver</div>
              <div className="text-sm font-medium">{driverQuery.data?.users.length}</div>
            </div>
          </div>
          <div className="flex items-center rounded-2xl bg-white p-2 text-black shadow-md">
            <RingProgress
              size={80}
              label={
                <div className={classNames('flex items-center justify-center rounded-full')}>
                  <IconReceipt2 size={30} />
                </div>
              }
              thickness={8}
              roundCaps
              sections={[{ value: 100, color: 'blue' }]}
            />
            <div className="pr-2">
              <div className="font-medium text-gray-400">Tổng Số Booking</div>
              <div className="text-sm font-medium">{bookingQuery.data?.bookings.length}</div>
            </div>
          </div>
          <div className="flex items-center rounded-2xl bg-white p-2 text-black shadow-md">
            <RingProgress
              size={80}
              label={
                <div className={classNames('flex items-center justify-center rounded-full')}>
                  <IconCoin size={30} />
                </div>
              }
              thickness={8}
              roundCaps
              sections={[{ value: 100, color: 'yellow' }]}
            />
            <div className="pr-2">
              <div className="font-medium text-gray-400">Tổng tiền</div>
              <div className="text-sm font-medium">
                {VND.format(
                  bookingQuery.data?.bookings
                    .filter((b) => b.bookingStatus === 'completed')
                    .reduce((total, b) => total + b.price, 0) || 0
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-12 bg-white px-10 pb-8 pt-20">
        <BarChart width={900} height={250} data={chart}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="pending" fill="#FFDBAA" />
          <Bar dataKey="accepted" fill="#96C291" />
          <Bar dataKey="progress" fill="#8ECDDD" />
          <Bar dataKey="rejected" fill="#EF9595" />
          <Bar dataKey="cancelled" fill="#C63D2F" />
          <Bar dataKey="completed" fill="#1D5D9B" />
        </BarChart>
        <LineChart width={900} height={250} data={chart} margin={{ left: 80 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={(value) => VND.format(value)} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total" stroke="#82ca9d" />
        </LineChart>
      </div>
    </div>
  );
};

export default Dashboard;
