import { useAdminStore } from '../stores/useAdminStore';

export function useAdminAuth() {
  const { token, admin, login, logout } = useAdminStore();
  return { token, admin, login, logout, isAuthenticated: Boolean(token) };
}
