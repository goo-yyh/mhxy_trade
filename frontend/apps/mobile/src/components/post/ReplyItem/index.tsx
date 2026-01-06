import { Card } from 'antd-mobile';
import { PostReply } from '@mhxy/shared/types';
import { formatDateTime } from '@mhxy/shared/utils';

export function ReplyItem({ reply }: { reply: PostReply }) {
  return (
    <Card style={{ marginBottom: 8 }}>
      <div style={{ marginBottom: 6 }}>{reply.content}</div>
      <div style={{ color: '#9ca3af', fontSize: 12 }}>{formatDateTime(reply.createdAt)}</div>
    </Card>
  );
}
