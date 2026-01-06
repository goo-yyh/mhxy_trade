'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { List, Card } from 'antd';
import { notificationService } from '../../services';
import { useNotificationStore } from '../../stores/useNotificationStore';

export default function NotificationsPage() {
  const queryClient = useQueryClient();
  const setUnreadCount = useNotificationStore((state) => state.setUnreadCount);
  const { data } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationService.getList({ page: 1, pageSize: 20 }),
  });

  const notifications = data?.data.data.list ?? [];

  return (
    <Card title="通知中心">
      <List
        dataSource={notifications}
        renderItem={(item) => (
          <List.Item
            onClick={async () => {
              if (item.isRead) return;
              await notificationService.markRead([item.id]);
              await queryClient.invalidateQueries({ queryKey: ['notifications'] });
              const countRes = await notificationService.getUnreadCount();
              setUnreadCount(countRes.data.data.total);
            }}
          >
            {item.title} - {item.content}
          </List.Item>
        )}
      />
    </Card>
  );
}
