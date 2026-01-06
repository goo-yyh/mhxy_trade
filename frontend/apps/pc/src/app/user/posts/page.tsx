'use client';

import { useQuery } from '@tanstack/react-query';
import { userService } from '../../../services';
import { PostList } from '../../../components/post/PostList';

export default function UserPosts() {
  const { data } = useQuery({
    queryKey: ['user', 'posts'],
    queryFn: () => userService.getMyPosts({ page: 1, pageSize: 20 }),
  });

  const posts = data?.data.data.list ?? [];

  return <PostList posts={posts} />;
}
