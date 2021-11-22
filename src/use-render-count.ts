export function useRenderCount(target:string) {
  const ref = useRef(1);
  console.info(`🔥 ${target} rendered ${ref.current++} times`);
}
