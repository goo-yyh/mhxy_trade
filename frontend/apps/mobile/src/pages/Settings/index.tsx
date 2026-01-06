import { List } from 'antd-mobile';
import { Header } from '../../components/common/Header';

export function Settings() {
  return (
    <div>
      <Header title="设置" back />
      <List>
        <List.Item>通知设置</List.Item>
        <List.Item>账号安全</List.Item>
        <List.Item>关于我们</List.Item>
      </List>
    </div>
  );
}
