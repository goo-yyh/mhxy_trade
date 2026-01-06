'use client';

import { useEffect } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { userService } from '../services';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!token) return;
    userService
      .getProfile()
      .then((res) => setUser(res.data.data))
      .catch(() => setUser(null));
  }, [setUser, token]);

  return <>{children}</>;
}
