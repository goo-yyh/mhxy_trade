'use client';

import { Card, Form, Input, Button } from 'antd';
import { userService } from '../../../services';

interface UserSettingsValues {
  nickname?: string;
  contactInfo?: string;
}

export default function UserSettings() {
  const handleSubmit = async (values: UserSettingsValues) => {
    await userService.updateProfile(values);
  };

  return (
    <Card title="账号设置">
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="nickname" label="昵称">
          <Input placeholder="请输入昵称" />
        </Form.Item>
        <Form.Item name="contactInfo" label="联系方式">
          <Input placeholder="微信/QQ/手机号" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form>
    </Card>
  );
}
