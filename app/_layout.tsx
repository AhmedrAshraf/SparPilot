import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { useFrameworkReady } from '../hooks/useFrameworkReady';
import SplashScreen from '../components/SplashScreen';
import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';

function LoadingView({ message, details }: { message: string; details?: string }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <ActivityIndicator size="large" color="#2DC6C9" />
      <Text style={{ marginTop: 12, color: '#666', textAlign: 'center' }}>{message}</Text>
      {details && (
        <Text style={{ marginTop: 8, color: '#999', fontSize: 12, textAlign: 'center' }}>
          {details}
        </Text>
      )}
    </View>
  );
}

export default function RootLayout() {
  const ready = useFrameworkReady();
  const [showSplash, setShowSplash] = useState(true);

  const [fontsLoaded, fontError] = useFonts({
    'Inter': require('@expo-google-fonts/inter/Inter_400Regular.ttf'),
  });

  useEffect(() => {
    if (fontError) {
      console.error('Error loading fonts:', fontError);
    }
    console.log('RootLayout mount', { ready, fontsLoaded, fontError, showSplash });
  }, [ready, fontsLoaded, fontError, showSplash]);

  useEffect(() => {
    let mounted = true;
    
    if (fontsLoaded || fontError) {
      const timer = setTimeout(() => {
        if (mounted) {
          console.log('Setting showSplash to false');
          setShowSplash(false);
        }
      }, 2000);
      
      return () => {
        mounted = false;
        clearTimeout(timer);
      };
    }
  }, [fontsLoaded, fontError]);

  // Show loading state while fonts are loading
  if (!fontsLoaded && !fontError) {
    return (
      <LoadingView 
        message="Loading resources..." 
        details={`Fonts: ${fontsLoaded ? 'Loaded' : 'Loading'}, Error: ${fontError ? 'Yes' : 'No'}`}
      />
    );
  }

  // Show loading state while framework is initializing
  if (!ready) {
    return (
      <LoadingView 
        message="Initializing..." 
        details={`Framework: ${ready ? 'Ready' : 'Not Ready'}, Splash: ${showSplash ? 'Showing' : 'Hidden'}`}
      />
    );
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