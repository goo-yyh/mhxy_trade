import { type CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { PullToRefresh, FloatingBubble, Button } from 'antd-mobile';
import { postService } from '../../services';
import { PostList } from '../../components/post/PostList';
import { Header } from '../../components/common/Header';
import { Loading } from '../../components/common/Loading';
import { Empty } from '../../components/common/Empty';

export function Home() {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['posts', 'home'],
    queryFn: () => postService.getList({ page: 1, pageSize: 20 }),
  });

  const posts = data?.data.data.list ?? [];

  return (
    <div>
      <Header title="梦幻交易" />
      <PullToRefresh onRefresh={refetch}>
        {isLoading ? <Loading /> : null}
        {!isLoading && posts.length === 0 ? <Empty title="暂无帖子" /> : null}
        {posts.length > 0 ? (
          <PostList posts={posts} onSelect={(id) => navigate(`/post/${id}`)} />
        ) : null}
      </PullToRefresh>
      <FloatingBubble
        onClick={() => navigate('/post/create')}
        style={{ '--initial-position-bottom': '90px' } as CSSProperties}
      >
        <Button color="primary">发布</Button>
      </FloatingBubble>
    </div>
  );
}
