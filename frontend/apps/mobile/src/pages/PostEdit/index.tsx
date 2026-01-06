import { useEffect, useState } from 'react';
import { Form, Input, Button, TextArea, Selector, Toast } from 'antd-mobile';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../components/common/Header';
import { postService } from '../../services';
import { useQuery } from '@tanstack/react-query';
import { POST_TYPES } from '@mhxy/shared/constants';

interface PostFormValues {
  title: string;
  type: string | string[];
  category: string;
  gameServer: string;
  price: string | number;
  content: string;
}

export function PostEdit() {
  const { id } = useParams();
  const postId = Number(id);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { data } = useQuery({
    queryKey: ['posts', postId],
    queryFn: () => postService.getDetail(postId),
    enabled: Number.isFinite(postId),
  });

  useEffect(() => {
    const post = data?.data.data;
    if (!post) return;
    form.setFieldsValue({
      title: post.title,
      type: [post.type],
      category: post.category,
      gameServer: post.gameServer,
      price: post.price,
      content: post.content,
    });
  }, [data, form]);

  const handleSubmit = async (values: PostFormValues) => {
    if (!Number.isFinite(postId)) return;
    setSubmitting(true);
    try {
      const typeValue = Array.isArray(values.type) ? values.type[0] : values.type;
      await postService.update(postId, {
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
      Toast.show('更新成功');
      navigate(`/post/${postId}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Header title="编辑帖子" back />
      <Form
        form={form}
        onFinish={handleSubmit}
        footer={
          <Button block type="submit" color="primary" loading={submitting}>
            保存
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
