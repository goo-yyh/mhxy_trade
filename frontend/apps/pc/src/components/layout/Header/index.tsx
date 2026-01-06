'use client';

import { Layout, Input, Button, Badge } from 'antd';
import Link from 'next/link';
import { BellOutlined } from '@ant-design/icons';
import { useAuthStore } from '../../../stores/useAuthStore';
import { useEffect } from 'react';
import { notificationService } from '../../../services';
import { useNotificationStore } from '../../../stores/useNotificationStore';
import { UserDropdown } from '../UserDropdown';

const { Header: AntHeader } = Layout;

export function Header() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const unreadCount = useNotificationStore((state) => state.unreadCount);
  const setUnreadCount = useNotificationStore((state) => state.setUnreadCount);

  useEffect(() => {
    if (!token) return;
    notificationService
      .getUnreadCount()
      .then((res) => setUnreadCount(res.data.data.total))
      .catch(() => setUnreadCount(0));
  }, [token, setUnreadCount]);

  return (
    <AntHeader style={{ background: '#0f172a', display: 'flex', alignItems: 'center', gap: 16 }}>
      <Link href="/" style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>
        梦幻交易
      </Link>
      <Input.Search placeholder="搜索装备/账号" style={{ maxWidth: 320 }} />
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}>
        <Link href="/notifications" style={{ color: '#fff' }}>
          <Badge count={unreadCount} size="small">
            <BellOutlined style={{ fontSize: 20 }} />
          </Badge>
        </Link>
        {user ? (
          <UserDropdown label={user.nickname || '我的'} />
        ) : (
          <Link href="/login">
            <Button>登录</Button>
          </Link>
        )}
      </div>
    </AntHeader>
  );
}
