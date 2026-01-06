'use client';

import { Menu } from 'antd';
import Link from 'next/link';
import {
  DashboardOutlined,
  FileTextOutlined,
  UserOutlined,
  SettingOutlined,
  HistoryOutlined,
} from '@ant-design/icons';

const items = [
  { key: '/dashboard', icon: <DashboardOutlined />, label: <Link href="/dashboard">仪表盘</Link> },
  {
    key: '/audit/posts',
    icon: <FileTextOutlined />,
    label: <Link href="/audit/posts">审核管理</Link>,
  },
  { key: '/posts', icon: <FileTextOutlined />, label: <Link href="/posts">帖子管理</Link> },
  { key: '/users', icon: <UserOutlined />, label: <Link href="/users">用户管理</Link> },
  {
    key: '/system/settings',
    icon: <SettingOutlined />,
    label: <Link href="/system/settings">系统设置</Link>,
  },
  { key: '/logs', icon: <HistoryOutlined />, label: <Link href="/logs">操作日志</Link> },
];

export function Sidebar() {
  return <Menu mode="inline" items={items} style={{ height: '100%' }} />;
}
