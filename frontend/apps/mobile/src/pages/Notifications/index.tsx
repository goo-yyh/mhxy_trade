import { useQuery, useQueryClient } from '@tanstack/react-query';
import { List, Toast } from 'antd-mobile';
import { notificationService } from '../../services';
import { Header } from '../../components/common/Header';
import { useNotificationStore } from '../../stores/useNotificationStore';

export function Notifications() {
  const queryClient = useQueryClient();
  const setUnreadCount = useNotificationStore((state) => state.setUnreadCount);
  const { data } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationService.getList({ page: 1, pageSize: 20 }),
  });

  const notifications = data?.data.data.list ?? [];

  return (
    <div>
      <Header title="通知消息" back />
      <List>
        {notifications.map((item) => (
          <List.Item
            key={item.id}
            description={item.content}
            onClick={async () => {
              if (item.isRead) return;
              await notificationService.markRead([item.id]);
              Toast.show('已标记为已读');
              await queryClient.invalidateQueries({ queryKey: ['notifications'] });
              const countRes = await notificationService.getUnreadCount();
              setUnreadCount(countRes.data.data.total);
            }}
          >
            {item.title}
          </List.Item>
        ))}
      </List>
    </div>
  );
}
