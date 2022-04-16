import React, { useMemo } from 'react';

export default function useComponentWillMount(fn:Function) {
  useMemo(fn, []);
}
