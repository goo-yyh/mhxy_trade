import { create } from 'zustand';
import { User } from '@mhxy/shared/types';
import { getToken, setToken, clearToken } from '@mhxy/shared/utils';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: getToken(),
  user: null,
  isAuthenticated: Boolean(getToken()),
  login: (token, user) => {
    setToken(token);
    set({ token, user, isAuthenticated: true });
  },
  logout: () => {
    clearToken();
    set({ token: null, user: null, isAuthenticated: false });
  },
  setUser: (user) => set({ user }),
}));
