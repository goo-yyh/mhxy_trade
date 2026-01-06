export const POINT_RULES = {
  register: { amount: 100, description: '新用户注册' },
  daily_login: { amount: 10, description: '每日登录' },
  login_streak_7: { amount: 50, description: '连续登录7天' },
  be_liked: { amount: 1, description: '帖子被点赞', dailyLimit: 50 },
  be_followed: { amount: 2, description: '帖子被关注', dailyLimit: 100 },
  contact_approved: { amount: 10, description: '联系申请被同意' },
  complete_profile: { amount: 50, description: '完善个人资料' },
  publish_post: { amount: -10, description: '发布帖子' },
  reply_post: { amount: -5, description: '回复帖子' },
  request_contact: { amount: -20, description: '申请联系方式' },
} as const;
