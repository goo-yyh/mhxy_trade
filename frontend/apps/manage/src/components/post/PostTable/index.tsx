'use client';

import { Table } from 'antd';

interface PostRow {
  id: number | string;
  title: string;
  status: string;
}

export function PostTable({ data }: { data: PostRow[] }) {
  return (
    <Table
      rowKey="id"
      dataSource={data}
      columns={[
        { title: 'ID', dataIndex: 'id' },
        { title: '标题', dataIndex: 'title' },
        { title: '状态', dataIndex: 'status' },
      ]}
      pagination={false}
    />
  );
}
