import { useAuthStore } from '../stores/useAuthStore';

export function useAuth() {
  const { token, user, isAuthenticated, login, logout, setUser } = useAuthStore();
  return { token, user, isAuthenticated, login, logout, setUser };
}
