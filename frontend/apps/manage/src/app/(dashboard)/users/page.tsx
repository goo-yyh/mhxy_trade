'use client';

import { Card } from 'antd';
import { DataTable } from '../../../components/common/DataTable';

export default function UsersPage() {
  return (
    <Card title="用户管理">
      <DataTable
        rowKey="id"
        columns={[
          { title: 'ID', dataIndex: 'id' },
          { title: '昵称', dataIndex: 'nickname' },
          { title: '状态', dataIndex: 'status' },
        ]}
        dataSource={[]}
      />
    </Card>
  );
}
