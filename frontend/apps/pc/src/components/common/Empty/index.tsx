'use client';

import { Empty as AntEmpty } from 'antd';

export function Empty({ description }: { description?: string }) {
  return <AntEmpty description={description || '暂无数据'} />;
}
