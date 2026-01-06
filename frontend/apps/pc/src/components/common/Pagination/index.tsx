'use client';

import { Pagination as AntPagination } from 'antd';

export function Pagination({
  total,
  current,
  pageSize,
  onChange,
}: {
  total: number;
  current: number;
  pageSize: number;
  onChange: (page: number) => void;
}) {
  return <AntPagination total={total} current={current} pageSize={pageSize} onChange={onChange} />;
}
