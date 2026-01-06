import type { Metadata } from 'next';
import './globals.css';
import { AdminAuthProvider } from '../providers/AdminAuthProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <AdminAuthProvider>{children}</AdminAuthProvider>
      </body>
    </html>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: '梦幻交易后台',
  description: '后台管理系统',
};
