import { useRef } from 'react';

export default function useRenderCount(target: string) {
  const ref = useRef(1); // minimum times of render
  console.info(`🔥 ${target} rendered ${ref.current++} times`);
}
