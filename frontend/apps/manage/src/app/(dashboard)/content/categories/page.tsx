'use client';

import { Card } from 'antd';
import { DataTable } from '../../../../components/common/DataTable';

export default function CategoriesPage() {
  return (
    <Card title="分类管理">
      <DataTable columns={[{ title: '名称', dataIndex: 'name' }]} dataSource={[]} />
    </Card>
  );
}
