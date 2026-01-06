import { Card, Tag } from 'antd-mobile';
import type { PostDetail as PostDetailType } from '@mhxy/shared/types';
import { formatPrice } from '@mhxy/shared/utils';

export function PostDetail({ post }: { post: PostDetailType }) {
  return (
    <Card style={{ margin: 12 }}>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>{post.title}</div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <Tag color="primary">{post.category}</Tag>
        <Tag>{post.gameServer}</Tag>
      </div>
      <div style={{ color: '#ef4444', fontWeight: 600 }}>{formatPrice(post.price)}</div>
      <div style={{ marginTop: 12 }}>{post.content}</div>
    </Card>
  );
}
