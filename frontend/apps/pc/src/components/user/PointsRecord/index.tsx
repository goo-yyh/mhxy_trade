'use client';

import { Table } from 'antd';

interface PointsRecordItem {
  id: number;
  description: string;
  amount: number;
  balance: number;
  createdAt: string;
}

export function PointsRecord({ records }: { records: PointsRecordItem[] }) {
  return (
    <Table
      rowKey="id"
      dataSource={records}
      columns={[
        { title: '时间', dataIndex: 'createdAt' },
        { title: '描述', dataIndex: 'description' },
        { title: '变动', dataIndex: 'amount' },
        { title: '余额', dataIndex: 'balance' },
      ]}
      pagination={false}
    />
  );
}
