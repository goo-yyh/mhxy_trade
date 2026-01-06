import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
}

export function Button({ variant = 'primary', style, ...props }: ButtonProps) {
  const base: React.CSSProperties = {
    padding: '8px 16px',
    borderRadius: 8,
    border: 'none',
    fontWeight: 600,
    cursor: 'pointer',
  };
  const variantStyle: React.CSSProperties =
    variant === 'ghost'
      ? { background: 'transparent', color: '#111827', border: '1px solid #e5e7eb' }
      : { background: '#111827', color: '#fff' };

  return <button {...props} style={{ ...base, ...variantStyle, ...style }} />;
}
