export type NotificationType =
  | 'system'
  | 'audit'
  | 'like'
  | 'follow'
  | 'contact_request'
  | 'contact_reply'
  | 'points';

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  content: string;
  relatedId?: number;
  relatedType?: string;
  isRead: boolean;
  createdAt: string;
}

export interface UnreadCount {
  total: number;
  byType: Record<NotificationType, number>;
}
