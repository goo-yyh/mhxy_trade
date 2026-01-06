'use client';

import { Card, Tag, Button } from 'antd';
import { PostDetail as PostDetailType } from '@mhxy/shared/types';
import { formatPrice } from '@mhxy/shared/utils';
import { ReplyList } from '../ReplyList';

export function PostDetail({ post }: { post: PostDetailType }) {
  return (
    <Card title={post.title}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <Tag>{post.category}</Tag>
        <Tag>{post.gameServer}</Tag>
      </div>
      <div style={{ color: '#ef4444', fontWeight: 600, marginBottom: 16 }}>
        {formatPrice(post.price)}
      </div>
      <div style={{ marginBottom: 16 }}>{post.content}</div>
      <div style={{ display: 'flex', gap: 12 }}>
        <Button type="primary">点赞</Button>
        <Button>关注</Button>
        <Button type="dashed">申请联系</Button>
      </div>
      {post.replies?.length ? (
        <div style={{ marginTop: 16 }}>
          <ReplyList replies={post.replies} />
        </div>
      ) : null}
    </Card>
  );
}
