import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SearchBar, CapsuleTabs } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { postService } from '../../services';
import { PostList } from '../../components/post/PostList';
import { Header } from '../../components/common/Header';

const sortOptions = [
  { key: 'latest', title: '最新' },
  { key: 'likes', title: '点赞' },
  { key: 'price_asc', title: '价格↑' },
  { key: 'price_desc', title: '价格↓' },
];

export function Search() {
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState('latest');
  const navigate = useNavigate();

  const queryParams = useMemo(() => ({ keyword, sort, page: 1, pageSize: 20 }), [keyword, sort]);
  const { data } = useQuery({
    queryKey: ['posts', 'search', queryParams],
    queryFn: () => postService.getList(queryParams),
  });

  const posts = data?.data.data.list ?? [];

  return (
    <div>
      <Header title="搜索" back />
      <SearchBar value={keyword} onChange={setKeyword} placeholder="搜索装备/账号/召唤兽" />
      <CapsuleTabs activeKey={sort} onChange={setSort}>
        {sortOptions.map((option) => (
          <CapsuleTabs.Tab key={option.key} title={option.title} />
        ))}
      </CapsuleTabs>
      <PostList posts={posts} onSelect={(id) => navigate(`/post/${id}`)} />
    </div>
  );
}
