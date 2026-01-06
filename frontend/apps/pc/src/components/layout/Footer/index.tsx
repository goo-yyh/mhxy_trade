'use client';

import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

export function Footer() {
  return (
    <AntFooter style={{ textAlign: 'center', color: '#64748b' }}>
      梦幻西游交易贴吧 · 交易有风险，交流需谨慎
    </AntFooter>
  );
}
