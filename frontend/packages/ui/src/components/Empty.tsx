import React from 'react';

interface EmptyProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export function Empty({ title = '暂无内容', description, action }: EmptyProps) {
  return (
    <div style={{ padding: '32px 16px', textAlign: 'center', color: '#6b7280' }}>
      <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{title}</div>
      {description ? <div style={{ marginBottom: 12 }}>{description}</div> : null}
      {action}
    </div>
  );
}
