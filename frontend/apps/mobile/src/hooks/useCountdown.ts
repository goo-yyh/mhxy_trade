import { useEffect, useState } from 'react';

export function useCountdown(initialSeconds = 60) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = window.setInterval(() => setSeconds((prev) => prev - 1), 1000);
    return () => window.clearInterval(timer);
  }, [seconds]);

  const start = () => setSeconds(initialSeconds);

  return { seconds, start, isRunning: seconds > 0 };
}
