'use client';

import { Popover, List } from 'antd';
import { Notification } from '@mhxy/shared/types';

export function NotificationPopover({ items }: { items: Notification[] }) {
  return (
    <Popover
      content={
        <List
          size="small"
          dataSource={items}
          renderItem={(item) => <List.Item>{item.title}</List.Item>}
        />
      }
    >
      <span style={{ cursor: 'pointer' }}>通知</span>
    </Popover>
  );
}
