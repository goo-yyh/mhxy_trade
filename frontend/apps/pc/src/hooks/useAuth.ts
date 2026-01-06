import { useAuthStore } from '../stores/useAuthStore';

export function useAuth() {
  const { token, user, isAuthenticated, login, logout } = useAuthStore();
  return { token, user, isAuthenticated, login, logout };
}
