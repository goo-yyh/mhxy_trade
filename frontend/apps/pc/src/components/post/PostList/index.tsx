import { PostListItem } from '@mhxy/shared/types';
import { PostCard } from '../PostCard';

export function PostList({ posts }: { posts: PostListItem[] }) {
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
