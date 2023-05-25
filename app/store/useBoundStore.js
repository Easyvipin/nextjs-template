import createReposSlice from '@app/containers/Repos/createReposSlice';
import { persist } from 'zustand/middleware';
import { create } from 'zustand';

const useBoundStore = create(
  persist(
    (...a) => {
      return {
        ...createReposSlice(...a)
      };
    },
    {
      name: 'bound-store'
    }
  )
);

export default useBoundStore;
