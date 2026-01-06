'use client';

import { Card, Form, Input, Button } from 'antd';
import { useRouter } from 'next/navigation';
import { adminAuthService } from '../../services';
import { useAdminStore } from '../../stores/useAdminStore';

interface LoginFormValues {
  username: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const login = useAdminStore((state) => state.login);

  const handleLogin = async (values: LoginFormValues) => {
    const res = await adminAuthService.login(values.username, values.password);
    login(res.data.data.token, res.data.data.admin);
    router.push('/dashboard');
  };

  return (
    <Card title="管理员登录" style={{ maxWidth: 420, margin: '60px auto' }}>
      <Form layout="vertical" onFinish={handleLogin}>
        <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item name="password" label="密码" rules={[{ required: true }]}>
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          登录
        </Button>
      </Form>
    </Card>
  );
}
