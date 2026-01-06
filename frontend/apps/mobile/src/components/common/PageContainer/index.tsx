import type { PropsWithChildren } from 'react';

interface PageContainerProps {
  padding?: number;
}

export function PageContainer({ padding = 12, children }: PropsWithChildren<PageContainerProps>) {
  return <div style={{ padding }}>{children}</div>;
}
