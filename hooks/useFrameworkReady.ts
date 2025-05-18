import { useEffect, useState } from 'react';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export function useFrameworkReady() {
  const [isReady, setIsReady] = useState(true); // Default to true for non-web platforms

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // For web platform
      window.frameworkReady = () => {
        setIsReady(true);
      };
    }
  }, []);

  return isReady;
}
