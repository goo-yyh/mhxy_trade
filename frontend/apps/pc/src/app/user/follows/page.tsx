'use client';

import { useQuery } from '@tanstack/react-query';
import { userService } from '../../../services';
import { PostList } from '../../../components/post/PostList';

export default function UserFollows() {
  const { data } = useQuery({
    queryKey: ['user', 'follows'],
    queryFn: () => userService.getMyFollows({ page: 1, pageSize: 20 }),
  });

  const posts = data?.data.data.list ?? [];

  return <PostList posts={posts} />;
}
