import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Header } from '../../components/common/Header';
import { userService } from '../../services';
import { PostList } from '../../components/post/PostList';

export function MyFollows() {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ['user', 'follows'],
    queryFn: () => userService.getMyFollows({ page: 1, pageSize: 20 }),
  });

  const posts = data?.data.data.list ?? [];

  return (
    <div>
      <Header title="我的关注" back />
      <PostList posts={posts} onSelect={(id) => navigate(`/post/${id}`)} />
    </div>
  );
}
