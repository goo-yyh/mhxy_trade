interface LoadingProps {
  label?: string;
}

export function Loading({ label = '加载中...' }: LoadingProps) {
  return (
    <div style={{ padding: '24px 16px', textAlign: 'center', color: '#6b7280' }}>
      <span>{label}</span>
    </div>
  );
}
