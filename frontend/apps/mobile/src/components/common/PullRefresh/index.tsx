import { PullToRefresh } from 'antd-mobile';
import { PropsWithChildren } from 'react';

interface PullRefreshProps {
  onRefresh: () => Promise<void>;
}

export function PullRefresh({ onRefresh, children }: PropsWithChildren<PullRefreshProps>) {
  return <PullToRefresh onRefresh={onRefresh}>{children}</PullToRefresh>;
}
