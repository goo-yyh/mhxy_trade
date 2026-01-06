import { useCallback, useState } from 'react';

export function useToggle(initial: boolean = false) {
  const [value, setValue] = useState<boolean>(initial);
  const toggle = useCallback(() => setValue((prev: boolean) => !prev), []);
  const open = useCallback(() => setValue(true), []);
  const close = useCallback(() => setValue(false), []);

  return { value, toggle, open, close };
}
