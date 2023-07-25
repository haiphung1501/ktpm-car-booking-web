import { createBrowserRouter, Outlet } from 'react-router-dom';

import { Layout } from '@/components/Layout';
import { Dashboard } from '@/pages/Dashboard';
import { ForgotPassword } from '@/pages/ForgotPassword';
import { Login } from '@/pages/Login';
import { Drivers } from '@/pages/Manage/Drivers';
import { Orders } from '@/pages/Manage/Orders';
import { Requests } from '@/pages/Manage/Requests';
import { Users } from '@/pages/Manage/Users';

export const router = createBrowserRouter([
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
        element: <></>,
      },
      {
        path: 'config',
        element: <></>,
      },
    ],
  },
]);
