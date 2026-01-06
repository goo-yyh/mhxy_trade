import { List } from 'antd-mobile';
import { Notification } from '@mhxy/shared/types';
import { NotificationItem } from '../NotificationItem';

export function NotificationList({ items }: { items: Notification[] }) {
  return (
    <List>
      {items.map((item) => (
        <NotificationItem key={item.id} item={item} />
      ))}
    </List>
  );
}
