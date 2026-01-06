import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button, Card, Tag, Dialog, TextArea, Toast } from 'antd-mobile';
import { contactService, postService } from '../../services';
import { Header } from '../../components/common/Header';
import { Loading } from '../../components/common/Loading';
import { formatPrice } from '@mhxy/shared/utils';
import { useAuthStore } from '../../stores/useAuthStore';

export function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const postId = Number(id);
  const { data, isLoading } = useQuery({
    queryKey: ['posts', postId],
    queryFn: () => postService.getDetail(postId),
    enabled: Number.isFinite(postId),
  });

  const post = data?.data.data;
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [followCount, setFollowCount] = useState(0);
  const [contactMessage, setContactMessage] = useState('');

  useEffect(() => {
    if (!post) return;
    setIsLiked(post.isLiked);
    setIsFollowed(post.isFollowed);
    setLikeCount(post.likeCount);
    setFollowCount(post.followCount);
  }, [post]);

  const handleToggleLike = async () => {
    if (!isAuthenticated) {
      Toast.show('请先登录');
      navigate('/login');
      return;
    }
    if (!post) return;
    const res = await postService.toggleLike(post.id);
    setIsLiked(res.data.data.isLiked);
    setLikeCount(res.data.data.likeCount);
  };

  const handleToggleFollow = async () => {
    if (!isAuthenticated) {
      Toast.show('请先登录');
      navigate('/login');
      return;
    }
    if (!post) return;
    const res = await postService.toggleFollow(post.id);
    setIsFollowed(res.data.data.isFollowed);
    setFollowCount(res.data.data.followCount);
  };

  const handleContact = async () => {
    if (!isAuthenticated) {
      Toast.show('请先登录');
      navigate('/login');
      return;
    }
    if (!post) return;
    if (contactMessage.length < 10) {
      Toast.show('留言至少10个字符');
      return;
    }
    await contactService.create({ postId: post.id, message: contactMessage });
    Toast.show('申请已提交');
    setContactMessage('');
  };

  return (
    <div>
      <Header title="帖子详情" back />
      {isLoading ? <Loading /> : null}
      {post ? (
        <Card style={{ margin: 12 }}>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{post.title}</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <Tag color="primary">{post.category}</Tag>
            <Tag>{post.gameServer}</Tag>
          </div>
          <div style={{ color: '#ef4444', fontWeight: 600, marginBottom: 12 }}>
            {formatPrice(post.price)}
          </div>
          <div style={{ lineHeight: 1.6 }}>{post.content}</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <Button color="primary" onClick={handleToggleLike}>
              {isLiked ? '已点赞' : '点赞'} {likeCount}
            </Button>
            <Button color="warning" onClick={handleToggleFollow}>
              {isFollowed ? '已关注' : '关注'} {followCount}
            </Button>
            <Button
              color="success"
              onClick={() => {
                Dialog.show({
                  title: '申请联系方式',
                  content: (
                    <div>
                      <div style={{ marginBottom: 8, color: '#6b7280' }}>
                        留言不少于10个字，申请将扣除积分。
                      </div>
                      <TextArea
                        value={contactMessage}
                        onChange={setContactMessage}
                        placeholder="请输入留言"
                        rows={4}
                      />
                    </div>
                  ),
                  closeOnAction: true,
                  actions: [
                    { key: 'cancel', text: '取消' },
                    { key: 'submit', text: '提交', onClick: handleContact },
                  ],
                });
              }}
            >
              申请联系
            </Button>
          </div>
        </Card>
      ) : null}
    </div>
  );
}
