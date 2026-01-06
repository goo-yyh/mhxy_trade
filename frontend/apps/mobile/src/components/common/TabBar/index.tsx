import { TabBar as MobileTabBar } from 'antd-mobile';
import { AppOutline, UserOutline, SearchOutline, BellOutline } from 'antd-mobile-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNotificationStore } from '../../../stores/useNotificationStore';

const tabs = [
  { key: '/', title: '首页', icon: <AppOutline /> },
  { key: '/search', title: '搜索', icon: <SearchOutline /> },
  { key: '/notifications', title: '通知', icon: <BellOutline /> },
  { key: '/mine', title: '我的', icon: <UserOutline /> },
];

export function TabBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const unreadCount = useNotificationStore((state) => state.unreadCount);

  return (
    <MobileTabBar activeKey={location.pathname} onChange={(value) => navigate(value)}>
      {tabs.map((item) => (
        <MobileTabBar.Item
          key={item.key}
          icon={item.icon}
          title={item.title}
          badge={item.key === '/notifications' && unreadCount > 0 ? unreadCount : undefined}
        />
      ))}
    </MobileTabBar>
  );
}
