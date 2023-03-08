import { useReducer } from "react";

type Cb<T> = (prev: T, next: T) => any;

type Output<T> = {
  state: T;
  updateState: (state: any) => any;
};

export function useReducerWrap<T = object>(obj: T, cb?: Cb<T>): Output<T> {
  const [state, updateState] = useReducer(
    (prev: T, next: T) => cb?.(prev, next) || { ...prev, ...next },
    { ...obj }
  );

  return { state, updateState };
}
