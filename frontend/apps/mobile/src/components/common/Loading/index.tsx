import { Loading as UiLoading } from '@mhxy/ui';

export function Loading({ label }: { label?: string }) {
  return <UiLoading label={label} />;
}
