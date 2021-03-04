import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export const useHitAction = () => {
  const dispatch = useDispatch();

  return useCallback(
    ({ type, payload }) => {
      dispatch({ type, payload });
    },
    [dispatch]
  );
};
