import { useState } from 'react';
import { Form, Input, Button, Tabs, Toast } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services';
import { useAuthStore } from '../../stores/useAuthStore';
import { Header } from '../../components/common/Header';
import { useCountdown } from '../../hooks/useCountdown';

interface PasswordLoginValues {
  phone: string;
  password: string;
  rememberMe?: boolean;
}

interface SmsLoginValues {
  phone: string;
  code: string;
}

export function Login() {
  const [loading, setLoading] = useState(false);
  const [smsLoading, setSmsLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const { seconds, start, isRunning } = useCountdown(60);
  const [smsForm] = Form.useForm();

  const handlePasswordLogin = async (values: PasswordLoginValues) => {
    setLoading(true);
    try {
      const res = await authService.loginByPassword(
        values.phone,
        values.password,
        values.rememberMe
      );
      login(res.data.data.token, res.data.data.user);
      Toast.show('登录成功');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleSmsLogin = async (values: SmsLoginValues) => {
    setLoading(true);
    try {
      const res = await authService.loginBySms(values.phone, values.code);
      login(res.data.data.token, res.data.data.user);
      Toast.show('登录成功');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleSendSms = async (phone?: string) => {
    if (!phone) {
      Toast.show('请先输入手机号');
      return;
    }
    setSmsLoading(true);
    try {
      await authService.sendSms(phone, 'login');
      Toast.show('验证码已发送');
      start();
    } finally {
      setSmsLoading(false);
    }
  };

  return (
    <div>
      <Header title="登录" />
      <Tabs defaultActiveKey="password">
        <Tabs.Tab title="密码登录" key="password">
          <Form
            onFinish={handlePasswordLogin}
            footer={
              <Button block type="submit" color="primary" loading={loading}>
                登录
              </Button>
            }
          >
            <Form.Item name="phone" label="手机号" rules={[{ required: true }]}>
              <Input placeholder="请输入手机号" />
            </Form.Item>
            <Form.Item name="password" label="密码" rules={[{ required: true }]}>
              <Input type="password" placeholder="请输入密码" />
            </Form.Item>
          </Form>
        </Tabs.Tab>
        <Tabs.Tab title="验证码登录" key="sms">
          <Form
            form={smsForm}
            onFinish={handleSmsLogin}
            footer={
              <Button block type="submit" color="primary" loading={loading}>
                登录
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
                  onClick={() => handleSendSms(smsForm.getFieldValue('phone'))}
                >
                  {isRunning ? `${seconds}s` : '发送验证码'}
                </Button>
              }
            >
              <Input placeholder="请输入验证码" />
            </Form.Item>
          </Form>
        </Tabs.Tab>
      </Tabs>
      <div style={{ padding: 12 }}>
        <Button block onClick={() => navigate('/register')}>
          注册新账号
        </Button>
      </div>
    </div>
  );
}
