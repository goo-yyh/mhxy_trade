import { Avatar } from 'antd-mobile';

export function UserAvatar({ src, name }: { src?: string | null; name?: string | null }) {
  return <Avatar src={src || undefined}>{name?.[0] || 'U'}</Avatar>;
}
