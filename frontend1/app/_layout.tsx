import '~/global.css';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeProvider } from '@react-navigation/native';
import { Href, SplashScreen, Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, View, Pressable, Text } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { PortalHost } from '@rn-primitives/portal';
import { ThemeToggle } from '~/components/ThemeToggle';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';

import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '~/lib/supabase'
import Auth from '~/components/Auth'
import Account from '~/components/Account'
import Popup  from '~/components/popup-card'

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

function NavigationMenu() {
  const router = useRouter();
  const menuItems = [
    { title: 'Home', route: '/' },
    { title: 'About', route: '/about' },
    { title: 'Contact', route: '/contact' },
  ];

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
      {menuItems.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => router.push(item.route as Href<string>)}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? '#ddd' : 'transparent',
              padding: 8,
              borderRadius: 4,
            },
          ]}
        >
          <Text>{item.title}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem('theme');
      if (Platform.OS === 'web') {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add('bg-background');
      }
      if (!theme) {
        AsyncStorage.setItem('theme', colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === 'dark' ? 'dark' : 'light';
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);
        setAndroidNavigationBar(colorTheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      setAndroidNavigationBar(colorTheme);
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      <NavigationMenu />
      <Stack>
        <Stack.Screen
          name='index'
          options={{
            title: '🅱️ORTOS',
            headerTitleAlign: 'center',
            headerRight: () => <ThemeToggle />,
            headerLeft: () => <Popup />,
          }}
        />
      </Stack>
      <PortalHost />
    </ThemeProvider>
  );
}
