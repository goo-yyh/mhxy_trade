'use client';

import { Card } from 'antd';

export function UserDetail({ name, phone }: { name: string; phone: string }) {
  return (
    <Card title={name}>
      <div>手机号：{phone}</div>
    </Card>
  );
}
