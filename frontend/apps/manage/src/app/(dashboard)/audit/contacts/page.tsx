'use client';

import { Card } from 'antd';
import { DataTable } from '../../../../components/common/DataTable';

export default function AuditContactsPage() {
  return (
    <Card title="联系申请审核">
      <DataTable
        rowKey="id"
        columns={[
          { title: 'ID', dataIndex: 'id' },
          { title: '申请人', dataIndex: 'requester' },
          { title: '帖子', dataIndex: 'post' },
        ]}
        dataSource={[]}
      />
    </Card>
  );
}
