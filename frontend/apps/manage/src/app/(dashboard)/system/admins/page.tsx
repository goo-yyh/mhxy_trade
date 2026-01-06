'use client';

import { Card } from 'antd';
import { DataTable } from '../../../../components/common/DataTable';

export default function AdminsPage() {
  return (
    <Card title="管理员管理">
      <DataTable columns={[{ title: '账号', dataIndex: 'username' }]} dataSource={[]} />
    </Card>
  );
}
