'use client';

import { Card, Form, Input, Button } from 'antd';

export default function SettingsPage() {
  return (
    <Card title="系统设置">
      <Form layout="vertical">
        <Form.Item label="站点名称" name="siteName">
          <Input placeholder="梦幻交易后台" />
        </Form.Item>
        <Button type="primary">保存</Button>
      </Form>
    </Card>
  );
}
