'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Row, Col } from 'antd';
import { postService } from '../../../services';
import { PostDetail } from '../../../components/post/PostDetail';
import { PostSidebar } from '../../../components/post/PostSidebar';
import { Loading } from '../../../components/common/Loading';

export default function PostDetailPage() {
  const params = useParams();
  const id = Number(params?.id);
  const { data, isLoading } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => postService.getDetail(id),
    enabled: Number.isFinite(id),
  });

  const post = data?.data.data;

  return (
    <Row gutter={24}>
      <Col span={16}>{isLoading ? <Loading /> : post ? <PostDetail post={post} /> : null}</Col>
      <Col span={8}>
        <PostSidebar />
      </Col>
    </Row>
  );
}
