import { useEffect, useState } from 'react';

interface DeviceType {
  os: 'ios' | 'android' | 'windows-phone' | 'unknown';
  isMobile: boolean | null;
  screenSize: number;
  supportsTouch: boolean;
}

export default function useGetDeviceInfo(): DeviceType {
  const [deviceInfo, setDeviceInfo] = useState<DeviceType>({
    os: 'unknown',
    isMobile: null,
    screenSize: 0,
    supportsTouch: false,
  });

  const REGEX_SET = {
    isMobileDevice:
      /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/,
    isWindowsPhone: /windows phone/i,
    isAndroid: /android/i,
    isIOS: /iPad|iPhone|iPod/,
  };

  const checkTouchSupport = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0;
  };

  const getOS = () => {
    const { isAndroid, isIOS, isWindowsPhone } = REGEX_SET;
    let userAgent = navigator.userAgent || navigator.vendor || (window as any)?.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (isWindowsPhone.test(userAgent)) return 'windows-phone';
    if (isAndroid.test(userAgent)) return 'android';
    if (isIOS.test(userAgent) && !(window as any)?.MSStream) return 'ios';

    return 'unknown';
  };

  useEffect(() => {
    const userDevice = !!window.navigator ? '' : navigator.userAgent;

    setDeviceInfo({
      supportsTouch: checkTouchSupport(),
      screenSize: innerWidth,
      os: getOS(),
      isMobile: !!userDevice.match(REGEX_SET.isMobileDevice),
    });
  }, []);

  return deviceInfo;
}
