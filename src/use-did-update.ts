import { useRef, useEffect } from "react";

export const useDidUpdate = (value: unknown) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

