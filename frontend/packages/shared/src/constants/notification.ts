export const NOTIFICATION_TYPES = {
  system: { label: '系统通知', icon: 'bell' },
  audit: { label: '审核通知', icon: 'file-check' },
  like: { label: '点赞', icon: 'heart' },
  follow: { label: '关注', icon: 'star' },
  contact_request: { label: '联系申请', icon: 'message' },
  contact_reply: { label: '申请回复', icon: 'mail' },
  points: { label: '积分变动', icon: 'coin' },
} as const;
