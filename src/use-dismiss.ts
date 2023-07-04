import { KeyboardEvent, MouseEvent, useCallback, useEffect } from 'react';

type Params = [id: string, cb: Function];
type EventAction = 'addEventListener' | 'removeEventListener';

export default function useDismiss(...args: Params) {
  const [id, cb] = args;

  const handleClickOutside = useCallback(
    (evt: MouseEvent | TouchEvent | UIEvent | Event) => {
      const isOutside = (evt.target as HTMLElement).closest('#' + id);
      return !isOutside && cb();
    },
    [cb, id]
  );

  const handleKeyPress = useCallback(
    (e: UIEvent | Event | KeyboardEvent<HTMLElement>) => {
      return (e as KeyboardEvent).key === 'Escape' && cb();
    },
    [cb]
  );

  const manageEvents = useCallback(
    (action: EventAction) => {
      document[action]('scroll', () => cb());
      document[action]('keydown', handleKeyPress);
      document[action]('click', handleClickOutside);
      document[action]('ontouchstart', handleClickOutside);
    },
    [handleKeyPress, handleClickOutside, cb]
  );

  useEffect(() => {
    manageEvents('addEventListener');

    return () => {
      manageEvents('removeEventListener');
    };
  }, [manageEvents]);
}
