import { useCallback, useEffect, useState } from 'react';

export function useInfiniteScroll(loadMore: () => Promise<void>) {
  const [loading, setLoading] = useState(false);

  const handleLoadMore = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    await loadMore();
    setLoading(false);
  }, [loadMore, loading]);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 200) {
        handleLoadMore();
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleLoadMore]);

  return { loading };
}
