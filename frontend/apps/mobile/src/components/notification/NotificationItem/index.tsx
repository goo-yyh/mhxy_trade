import { List } from 'antd-mobile';
import type { Notification } from '@mhxy/shared/types';

export function NotificationItem({ item }: { item: Notification }) {
  return <List.Item description={item.content}>{item.title}</List.Item>;
}
