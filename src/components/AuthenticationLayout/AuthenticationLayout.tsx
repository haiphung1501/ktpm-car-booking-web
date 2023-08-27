import { LoadingOverlay } from '@mantine/core';
import { useRoutes } from 'react-router-dom';

import { router } from '@/config/router';
import useAuth from '@/hooks/useAuth';
import { useUserStore } from '@/stores/user';

const AuthenticationLayout = () => {
  useAuth();
  const status = useUserStore.use.status();
  const routes = useRoutes(router);

  if (status === 'unauthorized')
    return (
      <div className="min-w-screen relative min-h-screen">
        <LoadingOverlay visible />
      </div>
    );
  return routes;
};

export default AuthenticationLayout;
