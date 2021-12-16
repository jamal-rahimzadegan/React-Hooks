import { useState, useEffect } from 'react';

type PosType = { latitude: number; longitude: number; error: unknown };

export default function useLocation(): PosType {
  const [position, setPosition] = useState<PosType>({ latitude: 0, longitude: 0, error: null });

  const handleChange = (pos) => {
    const { latitude, longitude } = pos.coords;

    setPosition({
      ...position,
      latitude,
      longitude,
    });
  };

  const handleError = (error) => setPosition({ ...position, error });

  useEffect(() => {
    const geo = navigator?.geolocation;

    if (!geo) {
      handleError('Geolocation is not supported');
      return;
    }

    const watcher = geo.watchPosition(handleChange, handleError);
    return () => geo.clearWatch(watcher);
  }, []);

  return position;
}
