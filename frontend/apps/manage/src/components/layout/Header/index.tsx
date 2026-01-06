'use client';

import { Layout, Button } from 'antd';
import { useAdminStore } from '../../../stores/useAdminStore';

const { Header: AntHeader } = Layout;

export function Header() {
  const { admin, logout } = useAdminStore();

  return (
    <AntHeader
      style={{
        background: '#0f172a',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <span>梦幻交易后台</span>
      <div>
        <span style={{ marginRight: 12 }}>{admin?.nickname || admin?.username}</span>
        <Button onClick={logout}>退出</Button>
      </div>
    </AntHeader>
  );
}
