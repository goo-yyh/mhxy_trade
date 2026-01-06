import { create } from 'zustand';
import { User } from '@mhxy/shared/types';

interface UserState {
  profile: User | null;
  setProfile: (profile: User | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
}));
