'use client';

import { Card } from 'antd';
import { DataTable } from '../../../../components/common/DataTable';

export default function PointsPage() {
  return (
    <Card title="积分配置">
      <DataTable
        columns={[
          { title: '规则', dataIndex: 'type' },
          { title: '数值', dataIndex: 'amount' },
        ]}
        dataSource={[]}
      />
    </Card>
  );
}
