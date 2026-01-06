'use client';

import { Card } from 'antd';
import { DataTable } from '../../../components/common/DataTable';

export default function PostsPage() {
  return (
    <Card title="帖子管理">
      <DataTable
        rowKey="id"
        columns={[
          { title: 'ID', dataIndex: 'id' },
          { title: '标题', dataIndex: 'title' },
          { title: '状态', dataIndex: 'status' },
        ]}
        dataSource={[]}
      />
    </Card>
  );
}
