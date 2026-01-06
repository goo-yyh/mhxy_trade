'use client';

import { Card } from 'antd';

export function ChartCard({ title }: { title: string }) {
  return (
    <Card title={title}>
      <div style={{ height: 200, background: '#e2e8f0', borderRadius: 8 }} />
    </Card>
  );
}
