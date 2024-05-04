import React, { useMemo } from 'react';

export default function useComponentWillMount(cb: Function) {
  useMemo(cb, []);
}
