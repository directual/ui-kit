import { useEffect, useRef } from 'react';

// eslint-disable-next-line import/prefer-default-export
export function usePrevious(value: any): any {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  return ref.current;
}
