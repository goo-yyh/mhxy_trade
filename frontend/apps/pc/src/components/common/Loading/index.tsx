'use client';

import { Spin } from 'antd';

export function Loading() {
  return (
    <div style={{ padding: 24, textAlign: 'center' }}>
      <Spin />
    </div>
  );
}
