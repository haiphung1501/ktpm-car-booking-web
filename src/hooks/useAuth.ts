import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import { getUserProfile } from '@/apis/user';
import { useUserStore } from '@/stores/user';

const useAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const setState = useUserStore.use.setState();
  const user = useUserStore.use.user();
  const { data, isLoading } = useQuery({ queryFn: getUserProfile });

  useEffect(() => {
    setState({ status: isLoading ? 'unauthorized' : 'authorized', user: data?.user || null });
  }, [data?.user, isLoading, setState]);

  if (!location.pathname.includes('/admin')) return;

  if (location.pathname.includes('/login')) {
    user && navigate('/admin');
  } else {
    !user && navigate('/admin/login');
  }
};

export default useAuth;
