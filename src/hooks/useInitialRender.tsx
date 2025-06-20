import { useEffect, useState } from 'react';

export function useInitialRender() {
  const [initialRender, setInitialRender] = useState(true);
  useEffect(() => {
    setInitialRender(false);
  }, []);
  return initialRender;
}
