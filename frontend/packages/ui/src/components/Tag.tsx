interface TagProps {
  text: string;
  tone?: 'default' | 'success' | 'warning' | 'danger';
}

const toneMap: Record<NonNullable<TagProps['tone']>, { bg: string; color: string }> = {
  default: { bg: '#f3f4f6', color: '#374151' },
  success: { bg: '#dcfce7', color: '#166534' },
  warning: { bg: '#fef9c3', color: '#854d0e' },
  danger: { bg: '#fee2e2', color: '#991b1b' },
};

export function Tag({ text, tone = 'default' }: TagProps) {
  const style = toneMap[tone];
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 8px',
        borderRadius: 999,
        background: style.bg,
        color: style.color,
        fontSize: 12,
      }}
    >
      {text}
    </span>
  );
}
