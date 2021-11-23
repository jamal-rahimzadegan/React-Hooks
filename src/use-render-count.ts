import { useRef } from 'react';

// Counts the number of renderings
// target is the name of the Component
// Minimum render is `1`
export default function useRenderCount(target: string) {
  let ref = useRef(1);
  console.info(`🔥 ${target} rendered ${ref.current++} times`);
}
