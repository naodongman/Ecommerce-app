// App.js
import React, { useEffect } from 'react';
import { View } from 'react-native';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme
} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import 'react-native-gesture-handler'
import * as SplashScreen from 'expo-splash-screen';

import useColorScheme from './hooks/useColorScheme';
import RootStack from './src/navigation/RootStack';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function App() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      const timer = setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    // Keep splash visible until fonts are loaded
    return null;
  }

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1 }}>
        <RootStack />
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}
