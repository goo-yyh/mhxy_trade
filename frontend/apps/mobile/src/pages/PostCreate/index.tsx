import { useState } from 'react';
import { Form, Input, Button, TextArea, Selector, Toast } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/common/Header';
import { postService } from '../../services';
import { POST_TYPES } from '@mhxy/shared/constants';
import type { PostType } from '@mhxy/shared/types';

interface PostFormValues {
  title: string;
  type: PostType | PostType[];
  category: string;
  gameServer: string;
  price: string | number;
  content: string;
}

export function PostCreate() {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values: PostFormValues) => {
    setSubmitting(true);
    try {
      const typeValue = (Array.isArray(values.type) ? values.type[0] : values.type) as PostType;
      await postService.create({
        title: values.title,
        type: typeValue,
        category: values.category,
        gameServer: values.gameServer,
        price: Number(values.price || 0),
        content: values.content,
        images: [],
        tags: [],
        isDraft: false,
      });
      Toast.show('发布成功');
      navigate('/');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Header title="发布帖子" back />
      <Form
        form={form}
        onFinish={handleSubmit}
        footer={
          <Button block type="submit" color="primary" loading={submitting}>
            提交审核
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
    </div>
  );
}
