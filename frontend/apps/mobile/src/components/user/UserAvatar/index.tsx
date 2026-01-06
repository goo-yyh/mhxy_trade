import { Avatar } from 'antd-mobile';

export function UserAvatar({ src, name }: { src?: string | null; name?: string | null }) {
  const avatarSrc = src ?? '';
  return <Avatar src={avatarSrc}>{name?.[0] || 'U'}</Avatar>;
}
