'use client';

import { Card } from 'antd';
import { DataTable } from '../../../../components/common/DataTable';

export default function TagsPage() {
  return (
    <Card title="标签管理">
      <DataTable columns={[{ title: '名称', dataIndex: 'name' }]} dataSource={[]} />
    </Card>
  );
}
