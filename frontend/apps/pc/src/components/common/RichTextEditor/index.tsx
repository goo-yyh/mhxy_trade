'use client';

import { Input } from 'antd';

export function RichTextEditor({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <Input.TextArea
      rows={6}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder="请输入详情"
    />
  );
}
