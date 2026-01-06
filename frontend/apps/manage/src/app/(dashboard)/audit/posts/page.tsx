'use client';

import { Card } from 'antd';
import { DataTable } from '../../../../components/common/DataTable';

export default function AuditPostsPage() {
  return (
    <Card title="帖子审核">
      <DataTable
        rowKey="id"
        columns={[
          { title: 'ID', dataIndex: 'id' },
          { title: '标题', dataIndex: 'title' },
          { title: '提交人', dataIndex: 'submitter' },
        ]}
        dataSource={[]}
      />
    </Card>
  );
}
