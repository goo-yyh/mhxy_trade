import { Card, Tag } from 'antd-mobile';
import { PostListItem } from '@mhxy/shared/types';
import { formatPrice, formatDate } from '@mhxy/shared/utils';

interface PostCardProps {
  post: PostListItem;
  onClick?: () => void;
}

export function PostCard({ post, onClick }: PostCardProps) {
  return (
    <Card onBodyClick={onClick} style={{ marginBottom: 12 }}>
      <div style={{ fontWeight: 600, marginBottom: 6 }}>{post.title}</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
        <Tag color="primary">{post.category}</Tag>
        <Tag>{post.gameServer}</Tag>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#ef4444', fontWeight: 600 }}>{formatPrice(post.price)}</span>
        <span style={{ color: '#9ca3af', fontSize: 12 }}>{formatDate(post.createdAt)}</span>
      </div>
    </Card>
  );
}
