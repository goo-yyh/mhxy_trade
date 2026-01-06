'use client';

import { Breadcrumb as AntBreadcrumb } from 'antd';

export function Breadcrumb({ items }: { items: string[] }) {
  return <AntBreadcrumb items={items.map((item) => ({ title: item }))} />;
}
