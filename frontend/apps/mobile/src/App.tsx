import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { TabBar } from './components/common/TabBar';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { useAuthStore } from './stores/useAuthStore';
import { useNotificationStore } from './stores/useNotificationStore';
import { notificationService, userService } from './services';

export function AppLayout() {
  const location = useLocation();
  const hideTab = ['/login', '/register'].includes(location.pathname);
  const { token, setUser } = useAuthStore();
  const setUnreadCount = useNotificationStore((state) => state.setUnreadCount);

  useEffect(() => {
    if (!token) return;
    userService
      .getProfile()
      .then((res) => setUser(res.data.data))
      .catch(() => setUser(null));
  }, [token, setUser]);

  useEffect(() => {
    if (!token) return;
    notificationService
      .getUnreadCount()
      .then((res) => setUnreadCount(res.data.data.total))
      .catch(() => setUnreadCount(0));
  }, [token, setUnreadCount]);

  return (
    <ErrorBoundary>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>{<Outlet />}</div>
        {!hideTab ? <TabBar /> : null}
      </div>
    </ErrorBoundary>
  );
}
