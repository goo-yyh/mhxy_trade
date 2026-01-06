export function formatPrice(price: number, currency = '¥') {
  const parts = price.toLocaleString('zh-CN', { maximumFractionDigits: 2 });
  return `${currency}${parts}`;
}

export function formatCount(count: number) {
  if (count < 1000) return `${count}`;
  if (count < 10000) return `${(count / 1000).toFixed(1)}千`;
  return `${(count / 10000).toFixed(1)}万`;
}

export function maskPhone(phone: string) {
  if (phone.length < 7) return phone;
  return `${phone.slice(0, 3)}****${phone.slice(-4)}`;
}
