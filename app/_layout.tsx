import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import SplashScreen from '@/components/SplashScreen';
import { View } from 'react-native';
import React from 'react';

export default function RootLayout() {
  const ready = useFrameworkReady();
  const [showSplash, setShowSplash] = useState(true);

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    let mounted = true;
    
    if (fontsLoaded || fontError) {
      const timer = setTimeout(() => {
        if (mounted) {
          setShowSplash(false);
        }
      }, 2000);
      
      return () => {
        mounted = false;
        clearTimeout(timer);
      };
    }
  }, [fontsLoaded, fontError]);

  // Show nothing while fonts are loading
  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Only render the navigation components after the framework is ready
  if (!ready) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      {!showSplash ? (
        <>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="products" options={{ headerShown: false }} />
            <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="light" />
        </>
      ) : (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )}
    </View>
  );
}