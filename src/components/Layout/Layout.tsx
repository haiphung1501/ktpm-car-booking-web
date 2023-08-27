import { type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import { Sidebar } from './Sidebar';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const location = useLocation();

  const title = () => {
    switch (location.pathname) {
      case '/admin/users': {
        return 'User List';
      }
      case '/admin/orders': {
        return 'Orders List';
      }
      case '/admin/drivers': {
        return 'Driver List';
      }
      default: {
        if (location.pathname.startsWith('/admin/profile')) return 'Profile';
        if (location.pathname.startsWith('/admin/booking')) return 'Booking details';
        return 'Dashboard';
      }
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full overflow-y-auto">
        <div className="flex items-center gap-2 border-b px-4 py-3">{title()}</div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
