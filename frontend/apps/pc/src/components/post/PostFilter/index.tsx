'use client';

import { Select } from 'antd';
import { POST_SORT_OPTIONS } from '@mhxy/shared/constants';

export function PostFilter({ onSortChange }: { onSortChange?: (value: string) => void }) {
  return (
    <Select
      placeholder="排序"
      onChange={(value) => onSortChange?.(value)}
      options={POST_SORT_OPTIONS.map((option) => ({ value: option.value, label: option.label }))}
      style={{ width: 200 }}
    />
  );
}
