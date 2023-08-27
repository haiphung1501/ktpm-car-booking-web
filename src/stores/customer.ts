import { create } from 'zustand';

import { User } from '@/types/user';
import { createSelectors } from './createSelectors';

type State = {
  customers: User[];
  drivers: User[];
};

type Actions = {
  setCustomers: (customers: User[]) => void;
  getCustomerById: (id: string) => User | undefined;
  setDrivers: (drivers: User[]) => void;
  getDriverById: (id: string) => User | undefined;
};

const initialState: State = {
  customers: [],
  drivers: [],
};

export const useCustomerStore = createSelectors(
  create<State & Actions>((set, get) => ({
    customers: [],
    drivers: [],
    setCustomers: (customers) => {
      set({ customers });
    },
    getCustomerById: (id) => {
      return get().customers.find((customer) => customer._id === id);
    },
    setDrivers: (drivers) => {
      set({ drivers });
    },
    getDriverById: (id) => {
      return get().drivers.find((driver) => driver._id === id);
    },
  }))
);
