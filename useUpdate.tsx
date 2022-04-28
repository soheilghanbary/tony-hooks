import { useEffect, useRef } from 'react';

function useDidUpdate(callback: () => any, conditions?: any[]): void {
  const hasMountedRef = useRef(false);
  if (typeof conditions !== 'undefined' && !Array.isArray(conditions)) {
    conditions = [conditions];
  } else if (Array.isArray(conditions) && conditions.length === 0) {
    console.warn(
      'Using [] as the second argument makes useDidUpdate a noop. The second argument should either be `undefined` or an array of length greater than 0.'
    );
  }
  useEffect(() => {
    if (hasMountedRef.current) {
      callback();
    } else {
      hasMountedRef.current = true;
    }
  }, conditions);
}

export { useDidUpdate };