'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Card } from 'antd';
import { userService } from '../../../services';
import { PostList } from '../../../components/post/PostList';

export default function UserPublicPage() {
  const params = useParams();
  const id = Number(params?.id);

  const profileQuery = useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getPublicProfile(id),
    enabled: Number.isFinite(id),
  });

  const postsQuery = useQuery({
    queryKey: ['user', id, 'posts'],
    queryFn: () => userService.getUserPosts(id, { page: 1, pageSize: 20 }),
    enabled: Number.isFinite(id),
  });

  const profile = profileQuery.data?.data.data;
  const posts = postsQuery.data?.data.data.list ?? [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {profile ? (
        <Card title={profile.nickname || '玩家'}>
          <p>服务器：{profile.gameServer || '未填写'}</p>
          <p>简介：{profile.bio || '暂无简介'}</p>
        </Card>
      ) : null}
      <Card title="Ta的帖子">
        <PostList posts={posts} />
      </Card>
    </div>
  );
}
