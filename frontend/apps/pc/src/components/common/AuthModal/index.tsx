'use client';

import { Modal, Tabs } from 'antd';

export function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onCancel={onClose} footer={null} title="登录/注册">
      <Tabs
        items={[
          { key: 'login', label: '登录', children: <div>登录表单</div> },
          { key: 'register', label: '注册', children: <div>注册表单</div> },
        ]}
      />
    </Modal>
  );
}
