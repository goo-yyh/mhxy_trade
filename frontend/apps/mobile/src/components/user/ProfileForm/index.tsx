import { Form, Input, TextArea, Button } from 'antd-mobile';

interface ProfileFormValues {
  nickname?: string;
  bio?: string;
  gameServer?: string;
  contactInfo?: string;
}

export function ProfileForm({ onSubmit }: { onSubmit: (values: ProfileFormValues) => void }) {
  return (
    <Form
      onFinish={onSubmit}
      footer={
        <Button block type="submit" color="primary">
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
  );
}
