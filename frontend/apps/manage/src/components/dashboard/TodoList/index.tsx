'use client';

import { List } from 'antd';

export function TodoList({ items }: { items: string[] }) {
  return <List bordered dataSource={items} renderItem={(item) => <List.Item>{item}</List.Item>} />;
}
