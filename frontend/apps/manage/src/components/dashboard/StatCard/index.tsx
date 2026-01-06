'use client';

import { Card } from 'antd';

export function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <Card>
      <div style={{ color: '#64748b', marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 24, fontWeight: 600 }}>{value}</div>
    </Card>
  );
}
