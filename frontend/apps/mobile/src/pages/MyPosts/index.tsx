import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Header } from '../../components/common/Header';
import { userService } from '../../services';
import { PostList } from '../../components/post/PostList';

export function MyPosts() {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ['user', 'posts'],
    queryFn: () => userService.getMyPosts({ page: 1, pageSize: 20 }),
  });

  const posts = data?.data.data.list ?? [];

  return (
    <div>
      <Header title="我的帖子" back />
      <PostList posts={posts} onSelect={(id) => navigate(`/post/${id}`)} />
    </div>
  );
}
