import { List } from 'antd-mobile';
import { Notification } from '@mhxy/shared/types';

export function NotificationItem({ item }: { item: Notification }) {
  return <List.Item description={item.content}>{item.title}</List.Item>;
}
