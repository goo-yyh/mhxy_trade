import { Card } from 'antd-mobile';
import type { User } from '@mhxy/shared/types';
import { UserAvatar } from '../UserAvatar';

export function UserInfo({ user }: { user: User }) {
  return (
    <Card>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <UserAvatar src={user.avatar} name={user.nickname} />
        <div>
          <div style={{ fontWeight: 600 }}>{user.nickname || '玩家'}</div>
          <div style={{ color: '#6b7280' }}>积分：{user.points}</div>
        </div>
      </div>
    </Card>
  );
}
