'use client';

import { Modal } from 'antd';

export function ConfirmModal({
  open,
  title,
  onOk,
  onCancel,
}: {
  open: boolean;
  title: string;
  onOk: () => void;
  onCancel: () => void;
}) {
  return <Modal open={open} onOk={onOk} onCancel={onCancel} title={title} />;
}
