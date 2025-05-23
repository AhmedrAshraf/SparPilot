import { useEffect, useState, useRef } from 'react';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export function useFrameworkReady() {
  const [isReady, setIsReady] = useState(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;

    // For web platform
    if (typeof window !== 'undefined') {
      console.log('Web platform detected, setting up frameworkReady callback');
      window.frameworkReady = () => {
        console.log('Framework ready callback triggered');
        if (mountedRef.current) {
          setIsReady(true);
        }
      };
      
      // Set a timeout to force ready state if callback isn't called
      const timeoutId = setTimeout(() => {
        console.log('Framework ready timeout triggered, forcing ready state');
        if (mountedRef.current) {
          setIsReady(true);
        }
      }, 2000);

      return () => {
        mountedRef.current = false;
        clearTimeout(timeoutId);
        delete window.frameworkReady;
      };
    } else {
      // For native platforms, we're always ready
      console.log('Native platform detected, setting ready state immediately');
      if (mountedRef.current) {
        setIsReady(true);
      }
    }
  }, []);

  return isReady;
}
