import { useEffect } from 'react';

interface ArgsType {
  id: string;
  isRunning: boolean;
  fnToListen?: Function;
  callbackFn?: Function;
}

export default function useClickOutside(args: ArgsType): void {
  const { id, isRunning, fnToListen, callbackFn } = args;

  useEffect(() => {
     fnToListen?.();

    if (isRunning) {
      document.addEventListener('click', handleClick);
      document.addEventListener('ontouchstart', handleClick);
    }
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('ontouchstart', handleClick);
    };
  }, [isRunning]);

  const handleClick = (e) => {
    if (!e.target.closest('#' + id)) callbackFn();
  };
}
