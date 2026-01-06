'use client';

import { useEffect } from 'react';
import { adminAuthService } from '../services';
import { useAdminStore } from '../stores/useAdminStore';

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const { token, login, logout } = useAdminStore();

  useEffect(() => {
    if (!token) return;
    adminAuthService
      .getProfile()
      .then((res) => {
        const data = res.data.data;
        login(token, data);
      })
      .catch(() => logout());
  }, [token, login, logout]);

  return <>{children}</>;
}
