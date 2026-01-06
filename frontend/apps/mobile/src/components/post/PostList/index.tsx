import { List } from 'antd-mobile';
import { PostListItem } from '@mhxy/shared/types';
import { PostCard } from '../PostCard';

interface PostListProps {
  posts: PostListItem[];
  onSelect?: (id: number) => void;
}

export function PostList({ posts, onSelect }: PostListProps) {
  return (
    <List>
      {posts.map((post) => (
        <List.Item key={post.id}>
          <PostCard post={post} onClick={() => onSelect?.(post.id)} />
        </List.Item>
      ))}
    </List>
  );
}
