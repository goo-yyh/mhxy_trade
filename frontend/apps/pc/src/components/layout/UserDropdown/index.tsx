'use client';

import { Dropdown } from 'antd';
import Link from 'next/link';

export function UserDropdown({ label }: { label: string }) {
  return (
    <Dropdown
      menu={{
        items: [
          { key: 'profile', label: <Link href="/user">个人中心</Link> },
          { key: 'posts', label: <Link href="/user/posts">我的帖子</Link> },
          { key: 'settings', label: <Link href="/user/settings">设置</Link> },
        ],
      }}
    >
      <span style={{ cursor: 'pointer', color: '#fff' }}>{label}</span>
    </Dropdown>
  );
}
