import { useState } from 'react';
import { Form, Input, Button, Checkbox, Toast } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services';
import { useAuthStore } from '../../stores/useAuthStore';
import { Header } from '../../components/common/Header';
import { useCountdown } from '../../hooks/useCountdown';

interface RegisterValues {
  phone: string;
  code: string;
  password: string;
  agree?: boolean;
}

export function Register() {
  const [loading, setLoading] = useState(false);
  const [smsLoading, setSmsLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const { seconds, start, isRunning } = useCountdown(60);
  const [form] = Form.useForm();

  const handleRegister = async (values: RegisterValues) => {
    if (!values.agree) {
      Toast.show('请先同意用户协议');
      return;
    }
    setLoading(true);
    try {
      const res = await authService.register(values.phone, values.code, values.password);
      login(res.data.data.token, res.data.data.user);
      Toast.show('注册成功');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleSendSms = async () => {
    const phone = form.getFieldValue('phone');
    if (!phone) {
      Toast.show('请先输入手机号');
      return;
    }
    setSmsLoading(true);
    try {
      await authService.sendSms(phone, 'register');
      Toast.show('验证码已发送');
      start();
    } finally {
      setSmsLoading(false);
    }
  };

  return (
    <div>
      <Header title="注册" back />
      <Form
        form={form}
        onFinish={handleRegister}
        footer={
          <Button block type="submit" color="primary" loading={loading}>
            注册
          </Button>
        }
      >
        <Form.Item name="phone" label="手机号" rules={[{ required: true }]}>
          <Input placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item
          name="code"
          label="验证码"
          rules={[{ required: true }]}
          extra={
            <Button
              size="small"
              color="primary"
              loading={smsLoading}
              disabled={isRunning}
              onClick={handleSendSms}
            >
              {isRunning ? `${seconds}s` : '发送验证码'}
            </Button>
          }
        >
          <Input placeholder="请输入验证码" />
        </Form.Item>
        <Form.Item name="password" label="密码" rules={[{ required: true }]}>
          <Input type="password" placeholder="请输入密码" />
        </Form.Item>
        <Form.Item name="agree" valuePropName="checked">
          <Checkbox>我已阅读并同意用户协议</Checkbox>
        </Form.Item>
      </Form>
    </div>
  );
}
