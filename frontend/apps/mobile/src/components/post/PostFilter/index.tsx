import { Selector } from 'antd-mobile';
import { POST_SORT_OPTIONS } from '@mhxy/shared/constants';

export function PostFilter({ onSortChange }: { onSortChange?: (value: string) => void }) {
  return (
    <Selector
      options={POST_SORT_OPTIONS.map((item) => ({ label: item.label, value: item.value }))}
      multiple={false}
      onChange={(values) => onSortChange?.(values[0])}
    />
  );
}
