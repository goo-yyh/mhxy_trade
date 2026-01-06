'use client';

import { Table } from 'antd';

interface UserRow {
  id: number | string;
  nickname: string;
  status: string;
}

export function UserTable({ data }: { data: UserRow[] }) {
  return (
    <Table
      rowKey="id"
      dataSource={data}
      columns={[
        { title: 'ID', dataIndex: 'id' },
        { title: '昵称', dataIndex: 'nickname' },
        { title: '状态', dataIndex: 'status' },
      ]}
      pagination={false}
    />
  );
}
