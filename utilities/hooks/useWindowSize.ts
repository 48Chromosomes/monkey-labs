import { useState, useEffect } from 'react';

type WindowSizeType = {
  width: number | undefined;
  height: number | undefined;
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSizeType>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      if (typeof window !== 'undefined') {
        setWindowSize({
          width: window?.innerWidth,
          height: window?.innerHeight,
        });
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);

      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowSize;
};
