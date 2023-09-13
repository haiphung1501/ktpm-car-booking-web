import { Outlet } from 'react-router-dom';

import { Layout } from '@/components/Layout';
import { Account } from '@/pages/Account';
import { Booking as SupportBooking } from '@/pages/Booking';
import { Dashboard } from '@/pages/Dashboard';
import { ForgotPassword } from '@/pages/ForgotPassword';
import { LandingPage } from '@/pages/LandingPage';
import { Login } from '@/pages/Login';
import { Drivers } from '@/pages/Manage/Drivers';
import { Booking, Orders } from '@/pages/Manage/Orders';
import { Requests } from '@/pages/Manage/Requests';
import { Users } from '@/pages/Manage/Users';
import { Profile } from '@/pages/Profile';

export const router = [
  {
    path: '/admin',
    element: <Outlet />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'profile/:id',
        element: <Profile />,
      },
      {
        path: 'booking/:id',
        element: <Booking />,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'drivers',
        element: <Drivers />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
      {
        path: 'requests',
        element: <Requests />,
      },
      {
        path: 'account',
        element: <Account />,
      },
      {
        path: 'support-booking',
        element: <SupportBooking />,
      },
      {
        path: 'config',
        element: <></>,
      },
    ],
  },
  {
    path: '/',
    element: <LandingPage />,
  },
];
