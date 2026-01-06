'use client';

import { Card, Tag } from 'antd';
import Link from 'next/link';
import { PostListItem } from '@mhxy/shared/types';
import { formatPrice } from '@mhxy/shared/utils';

interface PostCardProps {
  post: PostListItem;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card style={{ marginBottom: 16 }} title={<Link href={`/post/${post.id}`}>{post.title}</Link>}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <Tag>{post.category}</Tag>
        <Tag>{post.gameServer}</Tag>
      </div>
      <div style={{ color: '#ef4444', fontWeight: 600 }}>{formatPrice(post.price)}</div>
    </Card>
  );
}
