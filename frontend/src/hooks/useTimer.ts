import { useCallback, useEffect, useState } from 'react';

export const useTimer = ({ initialSeconds = 0, initiallyRunning = false } = {}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(initiallyRunning);

  const tick = useCallback(
    () => (running ? setSeconds((seconds) => seconds + 1) : undefined),
    [running]
  );

  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const reset = () => setSeconds(0);
  const set = (seconds: number) => setSeconds(seconds);
  const stop = () => {
    pause();
    reset();
  };

  useEffect(() => {
    const id = setInterval(tick, 1000);

    return () => clearInterval(id);
  }, [tick]);

  return { pause, reset, running, seconds, start, stop, set };
};
