'use client';

import { Card } from 'antd';
import { DataTable } from '../../../../components/common/DataTable';

export default function ServersPage() {
  return (
    <Card title="服务器配置">
      <DataTable columns={[{ title: '服务器', dataIndex: 'name' }]} dataSource={[]} />
    </Card>
  );
}
