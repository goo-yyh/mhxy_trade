'use client';

import { Menu } from 'antd';
import Link from 'next/link';

const items = [
  { key: '/user/posts', label: <Link href="/user/posts">我的帖子</Link> },
  { key: '/user/follows', label: <Link href="/user/follows">我的关注</Link> },
  { key: '/user/contacts', label: <Link href="/user/contacts">联系方式</Link> },
  { key: '/user/points', label: <Link href="/user/points">积分记录</Link> },
  { key: '/user/settings', label: <Link href="/user/settings">账号设置</Link> },
];

export function Sidebar() {
  return <Menu mode="inline" items={items} />;
}
