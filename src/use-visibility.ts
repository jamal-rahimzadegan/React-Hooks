import { useState, useEffect } from 'react';

export default function useVisibility(): boolean {
  const [isTabActive, setIsTabActive] = useState<boolean | null>(null);

  const onVisibilityChange = () => setIsTabActive(!document?.hidden);

  useEffect(() => {
    document.addEventListener('visibilitychange', onVisibilityChange, false);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  });

  return isTabActive;
}
