'use client';

import { Card, Avatar } from 'antd';
import { UserProfile } from '@mhxy/shared/types';

export function UserCard({ user }: { user: UserProfile }) {
  return (
    <Card>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Avatar src={user.avatar || undefined}>{user.nickname?.[0]}</Avatar>
        <div>
          <div style={{ fontWeight: 600 }}>{user.nickname || '玩家'}</div>
          <div style={{ color: '#64748b' }}>服务器：{user.gameServer || '未填写'}</div>
        </div>
      </div>
    </Card>
  );
}
