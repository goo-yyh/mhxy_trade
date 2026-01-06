'use client';

import { Form, Input, Button } from 'antd';

interface ProfileFormValues {
  nickname?: string;
  bio?: string;
  gameServer?: string;
  contactInfo?: string;
}

export function ProfileForm({ onSubmit }: { onSubmit: (values: ProfileFormValues) => void }) {
  return (
    <Form layout="vertical" onFinish={onSubmit}>
      <Form.Item name="nickname" label="昵称">
        <Input placeholder="请输入昵称" />
      </Form.Item>
      <Form.Item name="bio" label="简介">
        <Input.TextArea rows={3} placeholder="介绍一下自己" />
      </Form.Item>
      <Form.Item name="gameServer" label="服务器">
        <Input placeholder="填写常用服务器" />
      </Form.Item>
      <Form.Item name="contactInfo" label="联系方式">
        <Input placeholder="微信/QQ/手机号" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        保存
      </Button>
    </Form>
  );
}
