import { useRef, useEffect } from 'react';

export const useDidUpdate = (value: any) => {
 const ref = useRef();

    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
};


