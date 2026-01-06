'use client';

import { Card } from 'antd';
import { useAuthStore } from '../../stores/useAuthStore';

export default function UserHome() {
  const user = useAuthStore((state) => state.user);

  return (
    <Card title="个人中心">
      <p>昵称：{user?.nickname || '未登录'}</p>
      <p>积分：{user?.points ?? 0}</p>
    </Card>
  );
}
