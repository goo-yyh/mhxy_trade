import { InfiniteScroll } from 'antd-mobile';
import type { PropsWithChildren } from 'react';

interface InfiniteListProps {
  loadMore: () => Promise<void>;
  hasMore: boolean;
}

export function InfiniteList({
  loadMore,
  hasMore,
  children,
}: PropsWithChildren<InfiniteListProps>) {
  return (
    <div>
      {children}
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
  );
}
