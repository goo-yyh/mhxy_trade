import { Form, Input, TextArea, Button, Selector } from 'antd-mobile';
import { POST_TYPES } from '@mhxy/shared/constants';

interface PostFormValues {
  title: string;
  type: string | string[];
  category: string;
  gameServer: string;
  price: string;
  content: string;
}

export function PostForm({ onSubmit }: { onSubmit: (values: PostFormValues) => void }) {
  return (
    <Form
      onFinish={onSubmit}
      footer={
        <Button block type="submit" color="primary">
          提交
        </Button>
      }
    >
      <Form.Item name="title" label="标题" rules={[{ required: true }]}>
        <Input placeholder="请输入标题" />
      </Form.Item>
      <Form.Item name="type" label="类型" rules={[{ required: true }]}>
        <Selector
          options={POST_TYPES.map((item) => ({ label: item.label, value: item.value }))}
          columns={3}
          multiple={false}
        />
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
        <TextArea placeholder="请输入详情" rows={5} />
      </Form.Item>
    </Form>
  );
}
