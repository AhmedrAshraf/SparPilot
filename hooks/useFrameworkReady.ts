import { useEffect, useState } from 'react';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export function useFrameworkReady() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // For web platform
    if (typeof window !== 'undefined') {
      console.log('Web platform detected, setting up frameworkReady callback');
      window.frameworkReady = () => {
        console.log('Framework ready callback triggered');
        setIsReady(true);
      };
      
      // Set a timeout to force ready state if callback isn't called
      const timeoutId = setTimeout(() => {
        console.log('Framework ready timeout triggered, forcing ready state');
        setIsReady(true);
      }, 2000);

      return () => clearTimeout(timeoutId);
    } else {
      // For native platforms, we're always ready
      console.log('Native platform detected, setting ready state immediately');
      setIsReady(true);
    }
  }, []);

  return isReady;
}
