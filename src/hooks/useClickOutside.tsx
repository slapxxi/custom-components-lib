import { useEffect } from 'react';

export function useClickOutside(
  refs: React.RefObject<HTMLElement | null>[],
  handler: (event: Event) => void
) {
  useEffect(() => {
    const listener = (event: Event) => {
      // Do nothing if the click is inside any of the refs
      if (
        refs.some((ref) => {
          const el = ref?.current;
          return el && el.contains(event.target as Node);
        })
      ) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [refs, handler]);
}
