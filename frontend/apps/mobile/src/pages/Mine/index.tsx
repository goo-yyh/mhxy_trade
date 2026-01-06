import { List, Card, Button } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/common/Header';
import { useAuthStore } from '../../stores/useAuthStore';

export function Mine() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  return (
    <div>
      <Header title="我的" />
      <Card style={{ margin: 12 }}>
        <div style={{ fontSize: 16, fontWeight: 600 }}>{user?.nickname || '未设置昵称'}</div>
        <div style={{ color: '#6b7280', marginTop: 6 }}>积分：{user?.points ?? 0}</div>
      </Card>
      <List>
        <List.Item onClick={() => navigate('/mine/posts')}>我的帖子</List.Item>
        <List.Item onClick={() => navigate('/mine/follows')}>我的关注</List.Item>
        <List.Item onClick={() => navigate('/mine/contact-requests')}>联系方式申请</List.Item>
        <List.Item onClick={() => navigate('/notifications')}>通知消息</List.Item>
        <List.Item onClick={() => navigate('/settings')}>设置</List.Item>
      </List>
      <div style={{ padding: 12 }}>
        <Button block color="danger" onClick={logout}>
          退出登录
        </Button>
      </div>
    </div>
  );
}
