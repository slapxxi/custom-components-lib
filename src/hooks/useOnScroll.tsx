import { useEffect } from 'react';

export function useOnScroll(callback: () => void) {
  useEffect(() => {
    window.addEventListener('scroll', callback);
    return () => window.removeEventListener('scroll', callback);
  }, [callback]);
}
