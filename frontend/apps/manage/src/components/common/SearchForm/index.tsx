'use client';

import { Form, Input, Button } from 'antd';

interface SearchValues {
  keyword?: string;
}

export function SearchForm({ onSearch }: { onSearch: (values: SearchValues) => void }) {
  return (
    <Form layout="inline" onFinish={onSearch}>
      <Form.Item name="keyword">
        <Input placeholder="关键词" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        搜索
      </Button>
    </Form>
  );
}
