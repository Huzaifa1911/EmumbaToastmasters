import React, {useEffect} from 'react';
import {ThemeProvider} from 'styled-components/native';
import {Provider as PaperProvider} from 'react-native-paper';

import AppWrapper from './AppWrapper';

import {AppDarkTheme, AppLightTheme} from 'Assets';
import {useColorScheme} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  const colorScheme = useColorScheme();

  const paperTheme = colorScheme === 'dark' ? AppDarkTheme : AppLightTheme;

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider theme={paperTheme}>
        <AppWrapper />
      </ThemeProvider>
    </PaperProvider>
  );
};

export default App;
