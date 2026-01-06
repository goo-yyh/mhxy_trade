'use client';

import { List } from 'antd';
import { PostReply } from '@mhxy/shared/types';

export function ReplyList({ replies }: { replies: PostReply[] }) {
  return (
    <List
      dataSource={replies}
      renderItem={(item) => (
        <List.Item>
          <div style={{ fontWeight: 500, marginBottom: 6 }}>作者回复</div>
          <div>{item.content}</div>
        </List.Item>
      )}
    />
  );
}
