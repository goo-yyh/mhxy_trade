import { AxiosInstance } from 'axios';
import { ApiResponse, PaginatedData, Notification, UnreadCount } from '@mhxy/shared/types';

export function createNotificationService(client: AxiosInstance) {
  return {
    getList(params: { page?: number; pageSize?: number; type?: string }) {
      return client.get<ApiResponse<PaginatedData<Notification>>>('/notifications', { params });
    },

    markRead(ids?: number[]) {
      return client.put<ApiResponse<null>>('/notifications/read', { ids });
    },

    getUnreadCount() {
      return client.get<ApiResponse<UnreadCount>>('/notifications/unread-count');
    },
  };
}
