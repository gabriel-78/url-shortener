import { useEffect, useRef } from 'react';

export function useRunOnce(effect: () => void | Promise<void>) {
  const hasRun = useRef<boolean>(false);

  useEffect(() => {
    if (hasRun.current) return;

    hasRun.current = true;
    effect();
  }, []);
}
