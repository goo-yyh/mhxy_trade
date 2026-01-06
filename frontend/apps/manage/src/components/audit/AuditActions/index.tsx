'use client';

import { Button } from 'antd';

export function AuditActions({
  onApprove,
  onReject,
}: {
  onApprove: () => void;
  onReject: () => void;
}) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button type="primary" onClick={onApprove}>
        通过
      </Button>
      <Button danger onClick={onReject}>
        拒绝
      </Button>
    </div>
  );
}
