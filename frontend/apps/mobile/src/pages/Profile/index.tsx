import { useState } from 'react';
import { Form, Input, TextArea, Button, Toast } from 'antd-mobile';
import { Header } from '../../components/common/Header';
import { userService } from '../../services';

interface ProfileValues {
  nickname?: string;
  bio?: string;
  gameServer?: string;
  contactInfo?: string;
}

export function Profile() {
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (values: ProfileValues) => {
    setSaving(true);
    try {
      await userService.updateProfile(values);
      Toast.show('保存成功');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <Header title="个人资料" back />
      <Form
        onFinish={handleSubmit}
        footer={
          <Button block type="submit" color="primary" loading={saving}>
            保存
          </Button>
        }
      >
        <Form.Item name="nickname" label="昵称">
          <Input placeholder="请输入昵称" />
        </Form.Item>
        <Form.Item name="bio" label="简介">
          <TextArea placeholder="介绍一下自己" rows={3} />
        </Form.Item>
        <Form.Item name="gameServer" label="服务器">
          <Input placeholder="填写常用服务器" />
        </Form.Item>
        <Form.Item name="contactInfo" label="联系方式">
          <Input placeholder="微信/QQ/手机号" />
        </Form.Item>
      </Form>
    </div>
  );
}
