import { createBrowserRouter, Outlet } from 'react-router-dom';

import { ForgotPassword } from '@/pages/ForgotPassword';
import { Login } from '@/pages/Login';

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
    path: '/',
    element: <div>About</div>,
  },
]);
