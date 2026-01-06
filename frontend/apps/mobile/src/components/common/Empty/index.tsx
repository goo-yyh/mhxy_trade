import { Empty as UiEmpty } from '@mhxy/ui';

export function Empty({ title, description }: { title?: string; description?: string }) {
  return <UiEmpty title={title} description={description} />;
}
