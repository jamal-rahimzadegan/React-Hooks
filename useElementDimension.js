import React, { useCallback, useEffect, useState } from 'react';

export default function useElementDimension(elementId, type = 'width', defaultWidth = 200, defaultHeight = null) {
  const [widthDimension, setWidthDimension] = useState(defaultWidth);
  const [heightDimension, setHeightDimension] = useState(defaultHeight);

  const getElementDimension = useCallback(() => {
    switch (type) {
      case 'width':
        setWidthDimension(document.getElementById(elementId).offsetWidth);
        break;
      case 'height':
        setHeightDimension(document.getElementById(elementId).offsetHeight);
        break;
      default:
        return null;
    }
  }, []);

  useEffect(() => {
    setWidthDimension(document.getElementById(elementId).offsetWidth);
    window.addEventListener('resize', getElementDimension);
    return () => window.removeEventListener('resize', getElementDimension);
  }, []);

  return { widthDimension, heightDimension };
}
