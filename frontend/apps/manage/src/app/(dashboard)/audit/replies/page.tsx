'use client';

import { Card } from 'antd';
import { DataTable } from '../../../../components/common/DataTable';

export default function AuditRepliesPage() {
  return (
    <Card title="回复审核">
      <DataTable
        rowKey="id"
        columns={[
          { title: 'ID', dataIndex: 'id' },
          { title: '内容', dataIndex: 'content' },
          { title: '关联帖子', dataIndex: 'post' },
        ]}
        dataSource={[]}
      />
    </Card>
  );
}
