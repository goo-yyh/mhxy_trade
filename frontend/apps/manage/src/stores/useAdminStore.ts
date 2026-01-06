import { create } from 'zustand';
import { setAdminToken, clearAdminToken, getAdminToken } from '../services';

interface AdminInfo {
  id: number;
  username: string;
  nickname?: string;
  role?: string;
}

interface AdminState {
  token: string | null;
  admin: AdminInfo | null;
  login: (token: string, admin: AdminInfo) => void;
  logout: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  token: getAdminToken(),
  admin: null,
  login: (token, admin) => {
    setAdminToken(token);
    set({ token, admin });
  },
  logout: () => {
    clearAdminToken();
    set({ token: null, admin: null });
  },
}));
