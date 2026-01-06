'use client';

import { Card } from 'antd';

export function PostDetail({ title, content }: { title: string; content: string }) {
  return (
    <Card title={title}>
      <div>{content}</div>
    </Card>
  );
}
