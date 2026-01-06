'use client';

import { Card, Form, Input, Button } from 'antd';
import { useRouter } from 'next/navigation';
import { authService } from '../../../services';
import { useAuthStore } from '../../../stores/useAuthStore';

interface LoginFormValues {
  phone: string;
  password: string;
  rememberMe?: boolean;
}

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleLogin = async (values: LoginFormValues) => {
    const res = await authService.loginByPassword(values.phone, values.password, values.rememberMe);
    login(res.data.data.token, res.data.data.user);
    router.push('/');
  };

  return (
    <Card title="登录" style={{ maxWidth: 420, margin: '40px auto' }}>
      <Form layout="vertical" onFinish={handleLogin}>
        <Form.Item name="phone" label="手机号" rules={[{ required: true }]}>
          <Input placeholder="请输入手机号" />
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
