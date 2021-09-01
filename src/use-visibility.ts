import { useState, useEffect } from 'react';

export default function useVisibility(): boolean {
  const [isTabActive, setIsTabActive] = useState<boolean | null>(null);

  const handleChange = () => setIsTabActive(!document?.hidden);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleChange, false);
    return () => document.removeEventListener('visibilitychange', handleChange);
  });

  return isTabActive;
}
