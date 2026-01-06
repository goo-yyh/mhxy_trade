'use client';

import { useEffect } from 'react';
import { Layout } from 'antd';
import { useRouter } from 'next/navigation';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import { useAdminStore } from '../../../stores/useAdminStore';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const token = useAdminStore((state) => state.token);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Layout>
        <Layout.Sider width={220} style={{ background: '#fff' }}>
          <Sidebar />
        </Layout.Sider>
        <Layout.Content style={{ padding: 24, background: '#f8fafc' }}>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
}
