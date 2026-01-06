'use client';

import { List } from 'antd';

export function AuditList({ items }: { items: { id: number; title: string }[] }) {
  return <List dataSource={items} renderItem={(item) => <List.Item>{item.title}</List.Item>} />;
}
