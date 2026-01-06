import type { PropsWithChildren } from 'react';

export function SafeArea({ children }: PropsWithChildren) {
  return <div style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>{children}</div>;
}
