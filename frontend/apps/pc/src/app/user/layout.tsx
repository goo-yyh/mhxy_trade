'use client';

import { Layout } from 'antd';
import { Sidebar } from '../../components/layout/Sidebar';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <Layout.Sider width={200} style={{ background: '#fff' }}>
        <Sidebar />
      </Layout.Sider>
      <Layout.Content style={{ padding: '0 24px' }}>{children}</Layout.Content>
    </Layout>
  );
}
