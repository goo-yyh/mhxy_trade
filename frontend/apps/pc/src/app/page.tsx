'use client';

import { Row, Col, Card } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { postService } from '../services';
import { PostList } from '../components/post/PostList';
import { PostSidebar } from '../components/post/PostSidebar';
import { PostFilter } from '../components/post/PostFilter';

export default function Home() {
  const { data } = useQuery({
    queryKey: ['posts', 'home'],
    queryFn: () => postService.getList({ page: 1, pageSize: 20 }),
  });

  const posts = data?.data.data.list ?? [];

  return (
    <Row gutter={24}>
      <Col span={4}>
        <Card title="分类导航">武器 / 防具 / 召唤兽</Card>
      </Col>
      <Col span={14}>
        <div style={{ marginBottom: 16 }}>
          <PostFilter />
        </div>
        <PostList posts={posts} />
      </Col>
      <Col span={6}>
        <PostSidebar />
      </Col>
    </Row>
  );
}
