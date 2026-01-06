'use client';

import { Card, Form, Input, Button } from 'antd';
import { useRouter } from 'next/navigation';
import { authService } from '../../../services';
import { useAuthStore } from '../../../stores/useAuthStore';

interface RegisterFormValues {
  phone: string;
  code: string;
  password: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleRegister = async (values: RegisterFormValues) => {
    const res = await authService.register(values.phone, values.code, values.password);
    login(res.data.data.token, res.data.data.user);
    router.push('/');
  };

  return (
    <Card title="注册" style={{ maxWidth: 420, margin: '40px auto' }}>
      <Form layout="vertical" onFinish={handleRegister}>
        <Form.Item name="phone" label="手机号" rules={[{ required: true }]}>
          <Input placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item name="code" label="验证码" rules={[{ required: true }]}>
          <Input placeholder="请输入验证码" />
        </Form.Item>
        <Form.Item name="password" label="密码" rules={[{ required: true }]}>
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          注册
        </Button>
      </Form>
    </Card>
  );
}
