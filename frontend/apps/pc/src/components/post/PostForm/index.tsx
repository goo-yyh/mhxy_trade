'use client';

import { Form, Input, Button } from 'antd';
import { POST_TYPES } from '@mhxy/shared/constants';
import type { PostType } from '@mhxy/shared/types';

interface PostFormValues {
  title: string;
  type: PostType;
  category: string;
  gameServer: string;
  price: string | number;
  content: string;
}

export function PostForm({ onSubmit }: { onSubmit: (values: PostFormValues) => void }) {
  return (
    <Form layout="vertical" onFinish={onSubmit}>
      <Form.Item name="title" label="标题" rules={[{ required: true }]}>
        <Input placeholder="请输入标题" />
      </Form.Item>
      <Form.Item name="type" label="类型" rules={[{ required: true }]}>
        <Input placeholder={`可选: ${POST_TYPES.map((item) => item.label).join(' / ')}`} />
      </Form.Item>
      <Form.Item name="category" label="分类" rules={[{ required: true }]}>
        <Input placeholder="请输入分类" />
      </Form.Item>
      <Form.Item name="gameServer" label="服务器" rules={[{ required: true }]}>
        <Input placeholder="请输入服务器" />
      </Form.Item>
      <Form.Item name="price" label="价格" rules={[{ required: true }]}>
        <Input placeholder="请输入价格" />
      </Form.Item>
      <Form.Item name="content" label="详情" rules={[{ required: true }]}>
        <Input.TextArea rows={6} placeholder="请输入详情" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        提交
      </Button>
    </Form>
  );
}
