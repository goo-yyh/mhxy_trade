'use client';

import { Card } from 'antd';
import { useRouter } from 'next/navigation';
import { PostForm } from '../../../components/post/PostForm';
import { postService } from '../../../services';
import type { PostType } from '@mhxy/shared/types';

interface PostFormValues {
  title: string;
  type: PostType;
  category: string;
  gameServer: string;
  price: string | number;
  content: string;
}

export default function PostCreatePage() {
  const router = useRouter();

  const handleSubmit = async (values: PostFormValues) => {
    await postService.create({
      title: values.title,
      type: values.type,
      category: values.category,
      gameServer: values.gameServer,
      price: Number(values.price || 0),
      content: values.content,
      images: [],
      tags: [],
      isDraft: false,
    });
    router.push('/');
  };

  return (
    <Card title="发布帖子">
      <PostForm onSubmit={handleSubmit} />
    </Card>
  );
}
