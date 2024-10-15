import React from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './navigation/RootNavigation';
import {
  useFonts,
  OpenSans_600SemiBold,
  OpenSans_500Medium,
  OpenSans_700Bold,
  OpenSans_400Regular,
} from '@expo-google-fonts/open-sans';
import { GlobalAppColor } from './CONST';
import { BottomsheetContextProvider } from './contexts/BottomSheetContext';
import { AuthContextProvider } from './contexts/UserAuthContext';

export default function App() {
  let [fontsLoaded] = useFonts({
    OpenSans_600SemiBold,
    OpenSans_500Medium,
    OpenSans_700Bold,
    OpenSans_400Regular,
  });

  // Set the status bar style
  StatusBar.setBarStyle('dark-content');

  // If fonts are not loaded, show a loading indicator
  if (!fontsLoaded) {
    return <ActivityIndicator color={GlobalAppColor.Blue} />;
  }

  return (
    <AuthContextProvider>
      <BottomsheetContextProvider>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </BottomsheetContextProvider>
    </AuthContextProvider>
  );
}

