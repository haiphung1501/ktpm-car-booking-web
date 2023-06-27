import { create } from 'zustand';

import { UserProfile } from '@/types/user';
import { createSelectors } from './createSelectors';

export type AuthStatus = 'unauthorized' | 'authorized';

type State = {
  user: UserProfile | null;
  status: AuthStatus;
  accessToken: string;
};

type Actions = {
  setState: (state: State) => void;
  reset: () => void;
};

const initialState: State = {
  user: null,
  accessToken: '',
  status: 'unauthorized',
};

export const useUserStore = createSelectors(
  create<State & Actions>((set) => ({
    ...initialState,
    setState: (state) => {
      set(state);
    },
    reset: () => {
      setAccessToken('');
      set(initialState);
    },
  }))
);

export const getAccessToken = () => {
  const token = useUserStore.use.accessToken();
  if (!token) {
    return localStorage.getItem('accessToken');
  }
  return token;
};

export const setAccessToken = (token: string) => {
  localStorage.setItem('accessToken', token);
};
