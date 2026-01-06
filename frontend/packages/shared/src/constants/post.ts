export const POST_TYPES = [
  { value: 'sell_equipment', label: '出售装备' },
  { value: 'sell_account', label: '出售账号' },
  { value: 'sell_pet', label: '出售召唤兽' },
  { value: 'buy_equipment', label: '收购装备' },
  { value: 'buy_account', label: '收购账号' },
  { value: 'buy_pet', label: '收购召唤兽' },
] as const;

export const POST_STATUS = {
  draft: { label: '草稿', color: 'default' },
  pending: { label: '待审核', color: 'processing' },
  published: { label: '已发布', color: 'success' },
  rejected: { label: '已拒绝', color: 'error' },
  sold: { label: '已售出', color: 'warning' },
  closed: { label: '已关闭', color: 'default' },
  deleted: { label: '已删除', color: 'default' },
} as const;

export const POST_SORT_OPTIONS = [
  { value: 'latest', label: '最新发布' },
  { value: 'likes', label: '最多点赞' },
  { value: 'follows', label: '最多关注' },
  { value: 'price_asc', label: '价格从低到高' },
  { value: 'price_desc', label: '价格从高到低' },
] as const;
