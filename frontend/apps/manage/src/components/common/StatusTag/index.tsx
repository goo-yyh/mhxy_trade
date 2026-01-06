'use client';

import { Tag } from 'antd';

const statusMap: Record<string, string> = {
  pending: 'processing',
  approved: 'success',
  rejected: 'error',
  active: 'success',
  banned: 'warning',
};

export function StatusTag({ status }: { status: string }) {
  const color = statusMap[status] || 'default';
  return <Tag color={color}>{status}</Tag>;
}
