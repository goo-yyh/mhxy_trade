'use client';

import { List, Tag } from 'antd';
import Link from 'next/link';
import { PostListItem as PostListItemType } from '@mhxy/shared/types';
import { formatPrice } from '@mhxy/shared/utils';

export function PostListItem({ post }: { post: PostListItemType }) {
  return (
    <List.Item>
      <Link href={`/post/${post.id}`} style={{ fontWeight: 600 }}>
        {post.title}
      </Link>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <Tag>{post.category}</Tag>
        <Tag>{post.gameServer}</Tag>
        <Tag color="red">{formatPrice(post.price)}</Tag>
      </div>
    </List.Item>
  );
}
