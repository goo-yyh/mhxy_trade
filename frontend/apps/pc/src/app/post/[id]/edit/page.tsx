'use client';

import { Card } from 'antd';
import { useRouter, useParams } from 'next/navigation';
import { PostForm } from '../../../../components/post/PostForm';
import { postService } from '../../../../services';
import type { PostType } from '@mhxy/shared/types';

interface PostFormValues {
  title: string;
  type: PostType;
  category: string;
  gameServer: string;
  price: string | number;
  content: string;
}

export default function PostEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params?.id);

  const handleSubmit = async (values: PostFormValues) => {
    await postService.update(id, {
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
    router.push(`/post/${id}`);
  };

  return (
    <Card title="编辑帖子">
      <PostForm onSubmit={handleSubmit} />
    </Card>
  );
}
